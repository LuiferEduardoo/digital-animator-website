import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title_es: string;

  @Column({ type: 'text' })
  title_en: string;

  @Column({ type: 'text' })
  content_es: string;

  @Column({ type: 'text' })
  content_en: string;

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
