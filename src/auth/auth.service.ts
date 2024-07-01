import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('User or Pass invalid');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.APP_JWT_SECRET,
      }),
    };
  }

  async validateUserById(userId: string): Promise<any> {
    return this.userService.findById(userId); // Implemente sua lógica aqui
  }
}
