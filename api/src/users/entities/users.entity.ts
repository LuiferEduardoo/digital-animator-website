import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';

import { Authentication } from '../../auth/entities/authentications.entity';
import { RolUser } from '../../auth/entities/rolUser.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => Authentication, (authentication) => authentication.user, { nullable: false })
  authentication: Authentication;

  @OneToOne(() => RolUser, (rolUser) => rolUser.user, { nullable: false })
  rolUser: RolUser;
}