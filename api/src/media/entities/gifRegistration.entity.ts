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

@Entity('gif_registration')
export class GifRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => FilesRegistration,
    (filesRegistratio) => filesRegistratio.gifRegistration,
    { nullable: false },
  )
  @JoinColumn({ name: 'file_id' })
  file: FilesRegistration;

  @Column({ type: 'varchar', length: 32, nullable: false })
  width: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  height: string;

  @Column({ type: 'int', nullable: false })
  number_frames: number;

  @Column({ type: 'int', nullable: false })
  duration_each_frame: number;

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
