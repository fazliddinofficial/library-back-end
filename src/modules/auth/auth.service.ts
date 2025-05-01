import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { ERRORS } from '@constants';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp({
    email,
    fullName,
    password,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) {
    const foundUser = await this.userModel.findOne({ email });

    if (foundUser) {
      throw new ConflictException(ERRORS.USER_ALREADY_EXIST);
    }

    const createdUser = await this.userModel.create({
      email,
      fullName,
      password,
    });

    const token = jwt.sign({ email: email, id: createdUser._id }, 'secretKey', {
      expiresIn: '24h',
    });

    return {
      status: 'success',
      message: 'User signed up successfully!',
      token,
    };
  }

  async signIn({
    email = '',
    password = '',
  }: {
    email: string;
    password: string;
  }) {
    const foundUser = await this.userModel.findOne({ email });

    if (!foundUser || password !== foundUser.password) {
      throw new ConflictException('Email or password is not correct!');
    }

    const token = jwt.sign({ email: email, id: foundUser._id }, 'secretKey', {
      expiresIn: '24h',
    });

    return {
      status: 'success',
      message: 'User signed in successfully!',
      token,
    };
  }
}
