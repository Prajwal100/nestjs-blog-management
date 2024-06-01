import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'teste32213',
    });
  }

  async validate(payload: any) {
    try {
      const userData = {
        userId: payload.sub,
        username: payload.username,
        role: payload.role,
      };
      return userData;
    } catch (error) {
      throw new UnauthorizedException('Error', error.message);
    }
  }
}
