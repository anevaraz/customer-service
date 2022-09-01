import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

describe('UserController', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with success', async () => {
      // Arrange
      const body: CreateUserDto = {
        type: 'any-type',
        documentNumber: 'any-document',
        email: 'any@email.com',
        firstName: 'any-first-name',
        lastName: 'any-last-name',
      };
      const usersEntityMock = { ...body } as UserEntity;
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(usersEntityMock);
      // Act
      const result = await usersController.create(body);
      // Assert
      expect(result).toBeDefined();
      expect(usersService.create).toBeCalledTimes(1);
    });
  });
});
