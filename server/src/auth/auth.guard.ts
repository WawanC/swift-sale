import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) {
      request.res.clearCookie('access_token');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request.user = {
        userId: payload.userId,
      };
    } catch {
      request.res.clearCookie('access_token');
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request): string | null {
    const cookieToken = request.cookies['access_token'];

    if (cookieToken) {
      return cookieToken;
    } else {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : null;
    }
  }
}
