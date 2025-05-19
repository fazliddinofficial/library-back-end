import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { SCHEMA_NAMES } from '@constants';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true, versionKey: false })
export class Book {
  @Prop({ type: String, default: 'Garry Potter' })
  name: string;

  @Prop({ type: Number })
  bookNumber: number;

  @Prop({ type: String })
  bookType: string;

  @Prop({ type: String })
  inventarNumber: string;

  @Prop({ type: String })
  languageType: string;

  @Prop({ type: Number })
  createdYear: number;

  @Prop({ type: String })
  madeBy: string;

  @Prop({ type: String })
  author: string;

  @Prop({ type: String })
  isbn: string;

  @Prop({ type: Number, default: 0 })
  bookPage: number;

  @Prop({ type: Date, default: `${new Date().toLocaleTimeString()}` })
  digitizationDate: Date;

  @Prop({ type: Types.ObjectId, ref: SCHEMA_NAMES.User })
  digitizationBy: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export const BookModel: ModelDefinition = {
  name: Book.name,
  schema: BookSchema,
};
