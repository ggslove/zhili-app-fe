import { Parameter, Operation } from "swagger2/src/schema";
import { Type, GenericMethodDecorator } from "../decorator";
import { HttpMethod } from "../mvc/decorator";

export interface SwaggerApiCfg extends Operation {
  target: Type<any>; //类对象
  name: string; //方法名 必填
  path?: string; //必填  这个path 需要 controller 的path
  httpMethod?: HttpMethod; //必填
}

// tags?: Array<string>; //默认 ["defalut"]
// summary?: string; //默认""
// description?: string;
// produces?: Array<ContentType>;
// httpMethod?: HttpMethod; //必填
// parameters?: Parameter[]; //必有值
// responses?: any; //必须填
// in?: ParameterType; // 根据方法的@Query,@Body,@Head 等参数去获取



export const swaggerApiList: Array<SwaggerApiCfg> = [];

export interface TagsCfg {
  target: Type<any>;
  name: string; //方法名 必填
  tags: Array<string>; //默认 ["defalut"]
}

const createSwaggerApiDeccorator = <T>(key: keyof SwaggerApiCfg) => (
  value: T
): GenericMethodDecorator<any> => (
  target: Type<any>,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const apis = swaggerApiList.filter(
    it => it.name === name && it.target === target
  );
  if (apis.length > 1) {
    throw new Error(` ${target.name} 类中 有多个 ${name} 配置`);
  }
  if(key==='parameters'){
    if(!apis[0].parameters){
      apis[0].parameters=[];
    }
    apis[0].parameters.push(value);
  }else{
    //非 parameter时
    if (apis.length == 1) {
      Object.assign(apis[0], { [key]: value });
    } else {
      //TODO:这里可加入默认错误http code
      swaggerApiList.push({ target, name, [key]: value, responses: {} });
    }
  }
 
};

export const SApiPath = createSwaggerApiDeccorator<string>("path");
export const SApiTags = createSwaggerApiDeccorator<Array<string>>("tags");
export const SApiSummary = createSwaggerApiDeccorator<string>("summary");
export const SApiDescription = createSwaggerApiDeccorator<string>(
  "description"
);
export const SApiHttpMethod = createSwaggerApiDeccorator<HttpMethod>(
  "httpMethod"
);

export const SApiParameter= createSwaggerApiDeccorator<Parameter>("parameters");



//todo: schema 编写
// const userSchema = {
//   name: { type: 'string', required: true },
//   gender: { type: 'string', required: false, example: 'male' },
//   groups: {
//     type: 'array',
//     required: true,
//     items: { type: 'string', example: 'group1' }, // item's type will also be validated
//   },
// }

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


