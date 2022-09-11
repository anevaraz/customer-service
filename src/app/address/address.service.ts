import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from '../../helpers/messages.helper';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/users.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressesRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const user = await this.usersRepository.findOneByOrFail({
      id: userId,
    });
    createAddressDto.user = user;
    const address = this.addressesRepository.create(createAddressDto);
    return await this.addressesRepository.save(address);
  }

  async findAllByUser(userId: string) {
    const user: UserEntity = await this.usersRepository.findOne({
      relations: ['addresses'],
      where: { id: userId },
    });

    return user.addresses;
  }

  async findOneByOrFail(where: FindOptionsWhere<AddressEntity>) {
    try {
      return await this.addressesRepository.findOneByOrFail(where);
    } catch (e) {
      throw new NotFoundException(MessagesHelper.NOT_FOUND);
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address: AddressEntity = await this.findOneByOrFail({ id });
    this.addressesRepository.merge(address, updateAddressDto);
    return await this.addressesRepository.save(address);
  }

  async remove(id: string) {
    await this.findOneByOrFail({ id });
    await this.addressesRepository.delete(id);
    return;
  }
}
