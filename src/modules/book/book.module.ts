import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookModel } from './entities/book.entity';

@Module({
  imports: [MongooseModule.forFeature([BookModel])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
