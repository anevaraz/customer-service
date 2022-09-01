import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
    expect(customerRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer with success', async () => {
      // Arrange
      const data: CreateCustomerDto = {
        type: 'any-type',
        documentNumber: 'any-document',
        email: 'any@email.com',
        firstName: 'any-first-name',
        lastName: 'any-last-name',
      };
      const customerEntityMock = { ...data } as CustomerEntity;
      jest
        .spyOn(customerRepository, 'create')
        .mockReturnValueOnce(customerEntityMock);
      jest
        .spyOn(customerRepository, 'save')
        .mockResolvedValueOnce(customerEntityMock);
      // Act
      const result = await customerService.create(data);
      // Assert
      expect(result).toBeDefined();
      expect(customerRepository.create).toHaveBeenCalledTimes(1);
      expect(customerRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
