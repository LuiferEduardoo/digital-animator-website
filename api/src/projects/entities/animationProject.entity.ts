import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { GifRegistration } from '../../media/entities/gifRegistration.entity';
import { Project } from './projects.entity';

@Entity('animation_projects')
export class AnimationProject {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GifRegistration, { nullable: false })
  @JoinColumn({ name: 'gif_id' })
  gif: GifRegistration;

  @OneToOne(() => Project, { nullable: false })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}