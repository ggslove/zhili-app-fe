import {
  Document,
  Parameter,
  Operation,
  DataType,
  DataFormat
} from "swagger2/src/schema";
import {
  Type,
  GenericClassDecorator,
  GenericMethodDecorator,
  GenericPropertyDecorator
} from "../decorator";
//createSwaggerApiDeccorator<Parameter>("parameters");

//--------------SwaggerClass---------------------

type SwaggerClassType = "object";

interface SwaggerClass {
  target: Type<any>;
  type: SwaggerClassType;
  required?: Array<string>;
  className: string;
  properties?: { [key: string]: SwaggerFieldProp }; //需要校验
}

interface SwaggerFieldProp {
  type: DataType;
  format?: DataFormat;
  description?: string;
  example?: any;
  items?: Array<any>;
  enum?: Array<any>;
  required?: boolean;
}

interface SwaggerField extends SwaggerFieldProp {
  target: Type<any>;
  name: string; //字段名称
}

export const swaggerClassList: Array<SwaggerClass> = [];
export const swaggerFieldList: Array<SwaggerField> = [];

export function SwgClass(name: string = ""): GenericClassDecorator<any> {
  return (target: Type<any>) => {
    if (name == "") {
      name = target.name;
    }
    //这里使用的是 具function类，与 methodDecorator中的target target.property=== target
    swaggerClassList.push({ target, type: "object", className: name });
  };
}

export function SwgProperty(
  prop: SwaggerFieldProp
): GenericPropertyDecorator<any> {
  return (target: any, propertyKey: any) => {
    swaggerFieldList.push({ target, name: propertyKey, ...prop });
  };
}

class Test {
  @SwgProperty({ type: "string" }) name: string = "";
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
