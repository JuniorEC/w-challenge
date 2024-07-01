import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class PagesController {
  @Get('login')
  @Render('login')
  getLoginPage() {
    return {};
  }

  @Get('register')
  @Render('register')
  getRegisterPage() {
    return {};
  }

  @Get('lost-pass')
  @Render('lost-pass')
  getLostPassPage() {
    return {};
  }

  @Get('home')
  @Render('home')
  getHomePage() {
    return {};
  }
}
