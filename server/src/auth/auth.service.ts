import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(data: { email: string; username: string; password: string }) {
    data.password = await bcrypt.hash(data.password, 10);

    const newUser = await this.usersService.create(data);

    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
  }

  async login(user: User, password: string) {
    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) return false;

    const payload = {
      userId: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '5m',
      }),
    };
  }
}
