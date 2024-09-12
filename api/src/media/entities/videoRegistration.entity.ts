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

@Entity('video_registration')
export class VideoRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FilesRegistration, { nullable: false })
  @JoinColumn({ name: 'file_id' })
  file: FilesRegistration;

  @Column({ type: 'timestamp', nullable: false })
  duration: Date;

  @Column({ type: 'varchar', length: 32, nullable: false })
  resolution: string;

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
