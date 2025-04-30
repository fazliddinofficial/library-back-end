import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(
    @Body() signUpDto: { email: string; password: string; fullName: string },
  ) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signIn')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto);
  }
}
