import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

describe('UserService', () => {
  let usersService: UserService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a users with success', async () => {
      // Arrange
      const data: CreateUserDto = {
        type: 'any-type',
        documentNumber: 'any-document',
        email: 'any@email.com',
        firstName: 'any-first-name',
        lastName: 'any-last-name',
      };
      const usersEntityMock = { ...data } as UserEntity;
      jest
        .spyOn(usersRepository, 'create')
        .mockReturnValueOnce(usersEntityMock);
      jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValueOnce(usersEntityMock);
      // Act
      const result = await usersService.create(data);
      // Assert
      expect(result).toBeDefined();
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
