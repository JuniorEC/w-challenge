import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: any) {
    const validated = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return this.authService.login(validated);
  }
}
