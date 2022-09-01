import { Injectable } from '@nestjs/common';
import { UserEntity } from '../app/users/entities/users.entity';
import { UserStatusEnum } from '../app/users/enum/user-status.enum';
import { UserService } from '../app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneByOrFail({
        email,
        status: UserStatusEnum.ACTIVE,
      });
    } catch (e) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
