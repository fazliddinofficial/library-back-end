import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ERRORS } from '@constants';
import { FilterBookDto } from './dto/filter-book.dto';
import { client } from 'src/search/elasticSearch';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    const isInventorUnique = await this.bookModel.findOne({
      inventarNumber: createBookDto.inventarNumber,
    });
    const isIsbnUnique = await this.bookModel.findOne({
      isbn: createBookDto.isbn,
    });

    if (isInventorUnique) {
      throw new BadRequestException(
        `${createBookDto.inventarNumber} inventor raqami bilan kitob allaqachon yaratilgan!`,
      );
    }

    if (isIsbnUnique) {
      throw new BadRequestException(
        `${createBookDto.isbn} ISBN raqam bilan kitob allaqachon yaratilgan!`,
      );
    }

    const foundAllBooks = await this.bookModel.find();
    const createdBook = await this.bookModel.create({
      ...createBookDto,
      bookNumber: foundAllBooks.length + 1,
    });

    await client.index({
      index: 'books',
      id: createdBook._id.toString(),
      document: {
        name: createdBook.name,
        author: createdBook.author,
        isbn: createdBook.isbn,
        inventarNumber: createdBook.inventarNumber,
        madeBy: createdBook.madeBy,
      },
    });

    return {
      data: createdBook,
      status: 'success',
      message: 'Book created successfully!',
    };
  }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOne(id: string) {
    const foundBook = await this.bookModel.findById(id);

    if (!foundBook) {
      throw new BadRequestException(ERRORS.BOOK_NOT_FOUND);
    }

    return foundBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true },
    );

    if (!updatedBook) {
      throw new BadRequestException(ERRORS.BOOK_NOT_FOUND);
    }

    return updatedBook;
  }

  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      throw new BadRequestException(ERRORS.BOOK_NOT_FOUND);
    }

    const result = await client.delete({
      index: 'books',
      id: id,
    });

    if (result.result !== 'deleted') {
      throw new BadRequestException('Book not found from search database!');
    }

    return true;
  }

  async getBook(filter: FilterBookDto) {
    return await this.bookModel.find(filter);
  }

  async getSearchedBooks(q: string = 'all') {
    if (q === 'all') {
      return await this.bookModel.find();
    }
    if (q !== undefined && q !== null) {
      const foundBooks = await client.search({
        index: 'books',
        query: {
          multi_match: {
            query: q,
            fields: ['title', 'author', 'isbn', 'name', 'inventarNumber'],
          },
        },
      });

      const result = await Promise.all(
        foundBooks.hits.hits.map(async (v) => {
          const book = await this.bookModel.findById(v._id);
          if (book) {
            return book;
          }
        }),
      );

      return result;
    }
    throw new BadRequestException('Something went wrong!');
  }
}
