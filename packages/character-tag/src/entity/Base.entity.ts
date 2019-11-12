import {Column, PrimaryGeneratedColumn, BeforeInsert, AfterUpdate } from 'typeorm';
export default  abstract class Base {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "datetime" }) createdDate: Date;
  @Column({ type: "datetime" }) updateDate: Date;

  @BeforeInsert()
  updateDates() {
    this.createdDate = new Date();
  }

  @AfterUpdate()
  afterUpdates(){
    this.updateDate = new Date();
  }

}