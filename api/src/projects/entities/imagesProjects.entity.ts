import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ImagesRegistration } from '../../media/entities/imageRegistration.entity';
import { Project } from './projects.entity';

@Entity('images_projects')
export class ImagesProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ImagesRegistration,
    (imagesRegistration) => imagesRegistration.imagesProject,
    { nullable: false },
  )
  @JoinColumn({ name: 'image_id' })
  image: ImagesRegistration;

  @ManyToOne(() => Project, (projects) => projects.imagesProject, {
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

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