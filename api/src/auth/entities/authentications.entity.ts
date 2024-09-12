import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Entity('authentications')
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.authentication, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  password_reset_token: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}