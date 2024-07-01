import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findCep(zipcode: string): Promise<any> {
    try {
      const cepResponse = await axios.get(
        `https://viacep.com.br/ws/${zipcode}/json/`,
      );
      if (cepResponse.data.erro) {
        throw new BadRequestException('Invalid ZIP code');
      }

      return cepResponse.data;
    } catch (error) {
      throw new BadRequestException('Invalid ZIP code');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, confirmPassword, address } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const cepResponse = await axios.get(
      `https://viacep.com.br/ws/${address.zipCode}/json/`,
    );
    if (cepResponse.data.erro) {
      throw new BadRequestException('Invalid ZIP code');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async findAll(page: number, size: number): Promise<User[]> {
    return this.userModel
      .find()
      .skip((page - 1) * size)
      .limit(size)
      .exec();
  }

  async countUsers(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true },
    );
  }
}
