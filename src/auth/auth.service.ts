import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { message: 'hello i am login' };
  }

  register() {
    return { message: 'hello i am register' };
  }
}
