import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ERRORS } from '@constants';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto);
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

    return true;
  }

  async getBook(){
    
  }
}


// nomi, isbn, yili, muallifi