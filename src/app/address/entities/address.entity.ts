import { UserEntity } from '../../../app/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  address: string;

  @Column({ width: 6, nullable: false })
  number: number;

  @Column({ length: 100, nullable: true })
  complement: string;

  @Column({ length: 100, nullable: false })
  district: string;

  @Column({ length: 100, nullable: false })
  city: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ length: 8, nullable: false })
  postcode: string;

  @Column({ width: 1, default: 0 })
  default: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;
}
