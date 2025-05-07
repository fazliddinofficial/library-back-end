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
    const createdBook = await this.bookModel.create(createBookDto);

    await client.index({
      index: 'books',
      id: createdBook._id.toString(),
      document: {
        name: createdBook.name,
        author: createdBook.author,
        isbn: createdBook.isbn,
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

    const result = await client.delete({
      index: 'books',
      id: id,
    });

    console.log(result);

    if (!deletedBook) {
      throw new BadRequestException(ERRORS.BOOK_NOT_FOUND);
    }

    return true;
  }

  async getBook(filter: FilterBookDto) {
    return await this.bookModel.find(filter);
  }

  async getSearchedBooks(q: string) {
    if (q !== '' && q !== undefined && q !== null) {
      const result = await client.search({
        index: 'books',
        query: {
          multi_match: {
            query: q,
            fields: ['title', 'author', 'isbn'],
          },
        },
      });
      return result.hits.hits;
    }
    throw new BadRequestException('Something went wrong!');
  }
}
