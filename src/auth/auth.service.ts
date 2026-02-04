import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login() {
    return { message: 'hello i am login' };
  }

  register() {
    return { message: 'hello i am register' };
  }
}
