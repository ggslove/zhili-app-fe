namespace WebTypes {


export interface ControllerType {
  path: string;
  name:string;
  target: CommonTypes.Type<any>;
}

  export interface RouteType {
    target: CommonTypes.Type<any>;
    type: HttpMethod;
    name: string;
    path: string;
    func: any;
  }
  export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
  
}