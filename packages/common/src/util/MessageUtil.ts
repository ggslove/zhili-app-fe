export class ErrorMessage{
  private base:string;
  public constructor(base:string){
    this.base=base;
  }
  public setBase(base:string){
    this.base=base;
  }

  public getBase(){
    return this.base;
  }
  public fieldNotFound(field:string):string{
    return `${this.base},[${field}]属性不存在`;
  }

  public appendBasefieldNotFound(appendBase:string,field:string):string{
    return `${this.base}${appendBase},[${field}]属性不存在`;
  }
}