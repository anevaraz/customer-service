import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatusEnum } from '../enum/user-status.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 1, nullable: false })
  type: string;

  @Column({ name: 'document_number', length: 14, nullable: false })
  documentNumber: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ name: 'first_name', length: 20, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column({ name: 'date_of_birth', length: 10, nullable: true })
  dateOfBirth: string;

  @Column({ length: 1, nullable: true })
  gender: string;

  @Column({ name: 'phone_number', length: 11, nullable: true })
  phoneNumber: string;

  @Column({ width: 1, default: UserStatusEnum.ACTIVE })
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: string;
}
