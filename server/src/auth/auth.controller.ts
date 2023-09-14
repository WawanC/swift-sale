import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const isEmailExists = await this.usersService.findOneByEmail(
      registerDto.email,
    );
    if (isEmailExists) throw new ConflictException('E-Mail already used');

    const isUsernameExists = await this.usersService.findOneByUsername(
      registerDto.username,
    );
    if (isUsernameExists) throw new ConflictException('Username already used');

    const newUser = await this.authService.register(registerDto);
    return {
      message: 'Success',
      newUser: newUser,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    if (!user) throw new UnauthorizedException('Wrong credentials');

    const loginResult = await this.authService.login(user, loginDto.password);

    if (!loginResult) throw new UnauthorizedException('Wrong credentials');

    return response.cookie('access_token', loginResult.access_token).json({
      message: 'Success',
      token: loginResult,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@Req() request: Request) {
    if (!request.user) throw new UnauthorizedException();

    return {
      message: 'Success',
      user: request.user,
    };
  }
}
