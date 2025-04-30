import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/library'),
    UserModule, BookModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
