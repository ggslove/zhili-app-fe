import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./Base.entity";
import { SwgClass, SwgProperty } from "@zhili/common/src/swagger/decorator";

//标签配置
@Entity({ name: "tag_cfg" })
@SwgClass()
export default class TagCfg extends BaseEntity {
  @Column({ type: "varchar", nullable: false, width: 200 }) @SwgProperty({type:"string"})name: string;
  @Column({ type: "text", nullable: false }) @SwgProperty({type:"string"}) sqlContent: string;
}