/// <reference path = "../../types/CommonTypes.ts" /> 
/// <reference path = "../../types/WebTypes.ts" /> 
import { SwaggerTypes } from "../../types/SwaggerTypes";
import { swaggerClassCfgList, swaggerFieldCfgList } from '../'

export function SwgClass(): CommonTypes.GenericClassDecorator<any> {
  return (target: CommonTypes.Type<any>) => {
    //这里使用的是 具function类，与 methodDecorator中的target target.property=== target
    //如何把entity都加入进来
    
    swaggerClassCfgList.push({ target, type: "object", className: target.name });
  };
}

export function SwgProperty(
  prop: SwaggerTypes.SwaggerFieldProp
): CommonTypes.GenericPropertyDecorator<any> {
  return (target: any, propertyKey: any) => {
    swaggerFieldCfgList.push({ target, name: propertyKey, ...prop });
  };
}

//注释类编写
// @swaggerClass()
// export class subObject {
//   @swaggerProperty({ type: "string", required: true }) Email: string = "";
//   @swaggerProperty({ type: "string", required: true }) NickName: string = "";
//   @swaggerProperty({ type: "string", required: true }) Password: string = "";
// };
// @body((userInfo as any).swaggerDocument)
// static async Register(ctx: Router.IRouterContext) {
//   var params = (ctx as any).validatedBody as userInfo;
//   console.log(params);
// }
