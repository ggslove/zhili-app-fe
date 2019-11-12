import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './Base.entity';

//标签配置
@Entity({name:"tag_cfg"})
export default class CharacterTag  extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, width: 200 }) name: string;
  @Column({ type: 'text', nullable: false }) sqlContent: string;
  
}