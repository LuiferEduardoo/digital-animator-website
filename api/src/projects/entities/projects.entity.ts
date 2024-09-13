import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany
} from 'typeorm';

import { AnimationProject } from './animationProject.entity';
import { ImagesProject } from './imagesProjects.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  path_es: string;

  @Column({ type: 'varchar', nullable: true })
  path_en: string;

  @Column({ type: 'text', nullable: false })
  title_es: string;

  @Column({ type: 'text', nullable: true })
  title_en: string;

  @Column({ type: 'text', nullable: false })
  description_es: string;

  @Column({ type: 'text', nullable: true })
  description_en: string;

  @Column({ type: 'boolean', default: true })
  visible: boolean;

  @Column({ type: 'boolean', default: false })
  important: boolean;

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

  @OneToMany(() => ImagesProject, (imagesProject) => imagesProject.project)
  imagesProject: ImagesProject[];

  @OneToOne(() => AnimationProject, (animationProject) => animationProject.project, { nullable: false })
  animationProject: AnimationProject;

  @BeforeInsert()
  @BeforeUpdate()
  generatePaths() {
    if (this.path_es) {
      this.path_es = this.generateSlug(this.title_es);
    }
    if (this.path_en) {
      this.path_en = this.generateSlug(this.title_en);
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/-+/g, '-'); // Elimina guiones repetidos
  }
}