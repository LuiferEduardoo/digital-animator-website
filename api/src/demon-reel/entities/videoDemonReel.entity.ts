import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { VideoRegistration } from '../../media/entities/videoRegistration.entity';

@Entity('video_demon_reel')
export class VideoDemonReel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VideoRegistration, { nullable: false })
  @JoinColumn({ name: 'video_id' })
  video: VideoRegistration;

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