import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./Base.entity";
/**
 * 标签界面
 */
@Entity({ name: "tag_view" })
export default class TagView extends BaseEntity {
  @Column({ type: "int", nullable: false }) tagId: number;
  @Column({ type: "text", nullable: false }) viewConfig: string;
}