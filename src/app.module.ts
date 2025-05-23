import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

const localDB = 'mongodb://localhost:27017/';
const cloudDb =
  'mongodb+srv://fazliddinquvatboyev8:vUgIPtGTYIRXWeer@cluster0.1xachzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

@Module({
  imports: [
    MongooseModule.forRoot(localDB),
    UserModule,
    BookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
