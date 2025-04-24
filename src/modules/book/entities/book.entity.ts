import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: String })
  name: string;

  bookNumber: number;

  bookType: string
}

export const BookSchema = SchemaFactory.createForClass(Book);
