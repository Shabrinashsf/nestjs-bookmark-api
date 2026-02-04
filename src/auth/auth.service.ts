import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRequest, RegisterRequest } from './dto';
import * as argon from '@node-rs/argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(dto: RegisterRequest) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginRequest) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('credentials incorrect');

    const pwd = await argon.verify(user.password, dto.password);
    if (!pwd) throw new ForbiddenException('credentials incorrect');

    return user;
  }
}
