import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest } from './dto';
import { AuthenticationGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterRequest) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
