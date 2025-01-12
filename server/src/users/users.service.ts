import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: ILike(username),
      },
    });
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async findOneWithPassword(id: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id= :userId', {
        userId: id,
      })
      .addSelect('user.password')
      .getOne();
  }
}
