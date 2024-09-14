import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { GifRegistration } from './gifRegistration.entity';
import { ImagesRegistration } from './imageRegistration.entity';

@Entity('files_registration')
export class FilesRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  folder: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  format: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  file_size: string;

  @Column({ type: 'text', nullable: false })
  url: string;

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

  @OneToOne(() => GifRegistration, (gifRegistration) => gifRegistration.file, {
    nullable: false,
  })
  gifRegistration: GifRegistration;

  @OneToOne(
    () => ImagesRegistration,
    (imagesRegistration) => imagesRegistration.file,
    {
      nullable: false,
    },
  )
  imagesRegistration: ImagesRegistration;
}
