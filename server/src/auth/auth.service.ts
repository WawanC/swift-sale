import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async register(data: { email: string; username: string; password: string }) {
    const isEmailExists = await this.usersService.findOneByEmail(data.email);
    if (isEmailExists) throw new ConflictException('E-Mail already used');

    const isUsernameExists = await this.usersService.findOneByUsername(
      data.username,
    );
    if (isUsernameExists) throw new ConflictException('Username already used');

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = await this.usersService.create(data);

    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
  }
}
