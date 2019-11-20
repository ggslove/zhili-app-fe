import HttpStatus from '@zhili/common/src/util/HttpStatus';

export class ReponseData<T> {
  public constructor(data:T|undefined,code:HttpStatus,description:string| undefined){
    this.data=data;
    this.code=code;
    this.description=description;
  }
  data: T|undefined;  
  description?: string | undefined;
  code: HttpStatus;
}

export class ReponseBuilder<T>{
  private _code:HttpStatus;
  private _data: T|undefined;
  private _desc?:string| undefined;;
  data(d:T){
    this._data=d;
    return this;
  }
  code(c:HttpStatus){
    this._code=c;
    return this;
  }
  description(d:string){
    this._desc=d;
    return this;
  }

  build(): ReponseData<T> {
      return new ReponseData(this._data,this._code,this._desc);
  }
}

export function ResponseBuilder<T>(){
  return new ReponseBuilder<T>();
}
