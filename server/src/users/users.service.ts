import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: { email: string; username: string; password: string }) {
    const newUser = this.usersRepository.create({
      email: data.email.trim(),
      username: data.username.trim(),
      password: data.password.trim(),
    });

    return await this.usersRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findOneById(id: string) {
    return this.usersRepository.findOne({
      where: { id: id },
    });
  }
}
