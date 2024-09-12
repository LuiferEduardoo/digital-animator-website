import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FilesRegistration } from './filesRegistration.entity';

@Entity('images_registration')
export class ImagesRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FilesRegistration, { nullable: false })
  @JoinColumn({ name: 'file_id' })
  file: FilesRegistration;

  @Column({ type: 'varchar', length: 32, nullable: false })
  width: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  height: string;

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
}