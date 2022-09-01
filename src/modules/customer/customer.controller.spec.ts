import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
    expect(customerService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer with success', async () => {
      // Arrange
      const body: CreateCustomerDto = {
        type: 'any-type',
        documentNumber: 'any-document',
        email: 'any@email.com',
        firstName: 'any-first-name',
        lastName: 'any-last-name',
      };
      const customerEntityMock = { ...body } as CustomerEntity;
      jest
        .spyOn(customerService, 'create')
        .mockResolvedValueOnce(customerEntityMock);
      // Act
      const result = await customerController.create(body);
      // Assert
      expect(result).toBeDefined();
      expect(customerService.create).toBeCalledTimes(1);
    });
  });
});
