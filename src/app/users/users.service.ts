import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeactivateUserDto } from './dto/deactivate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { UserStatusEnum } from './enum/user-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAllByStatus(status: number) {
    return await this.usersRepository.find({
      where: { status: status | UserStatusEnum.DEACTIVE },
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id, status: UserStatusEnum.ACTIVE },
      });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.findOneOrFail(id);
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async deactivate(id: string) {
    const user: UserEntity = await this.findOneOrFail(id);
    const deactivate: DeactivateUserDto = {
      status: UserStatusEnum.DEACTIVE,
    };
    this.usersRepository.merge(user, deactivate);
    return await this.usersRepository.save(user);
  }
}
