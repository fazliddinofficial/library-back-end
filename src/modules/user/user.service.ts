import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { UserModule } from './user.module';
import { notFound } from 'src/constants/error';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserModule>) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User | string> {
    return (await this.userModel.findById(id || '')) || notFound('Users');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return (await this.userModel.findByIdAndDelete(id)) || notFound('User');
  }
}
