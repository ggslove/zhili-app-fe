
export class PaginationVo<T>{
  rows:Array<T>|undefined;  
  countNum:number;
  public constructor(rows:Array<T>|undefined,countNum:number){
    this.rows=rows;
    this.countNum=countNum;
  }
}