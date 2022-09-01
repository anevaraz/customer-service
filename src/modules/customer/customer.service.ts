import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DeactivateCustomerDto } from './dto/deactivate-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerStatusEnum } from './enum/customer-status.enum';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAllByStatus(status: number) {
    return await this.customerRepository.find({
      where: { status: status | CustomerStatusEnum.DEACTIVE },
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.customerRepository.findOneOrFail({
        where: { id, status: CustomerStatusEnum.ACTIVE },
      });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer: CustomerEntity = await this.findOneOrFail(id);
    this.customerRepository.merge(customer, updateCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async deactivate(id: string) {
    const customer: CustomerEntity = await this.findOneOrFail(id);
    const deactivate: DeactivateCustomerDto = {
      status: CustomerStatusEnum.DEACTIVE,
    };
    this.customerRepository.merge(customer, deactivate);
    return await this.customerRepository.save(customer);
  }
}
