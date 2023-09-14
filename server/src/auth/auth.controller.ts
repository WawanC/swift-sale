import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register() {
    return {
      message: 'Success',
      status: await this.authService.register(),
    };
  }
}
