import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    const newUser = await this.authService.register(registerDto);
    return {
      message: 'Success',
      newUser: newUser,
    };
  }
}
