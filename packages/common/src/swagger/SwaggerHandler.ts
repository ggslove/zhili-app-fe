
/// <reference path = "../types/CommonTypes.ts" /> 
import { SwaggerTypes } from "../types/SwaggerTypes";
import {
  swaggerApiList,
  swaggerParameterCfgList,
  swaggerApiResultList,
  swaggerClassCfgList,
  swaggerFieldCfgList,
} from ".";
import {
  validateSwaggerApi,
  validateSwaggerClass
} from './validate';
export const handlerSwaggerToDocument = () => {
  //处理 swagger 数据
  const swaggerClassMap: Map<CommonTypes.Type<any>, Array<SwaggerTypes.SwaggerFieldCfg>> = new Map();
  //const refClassList:Array<Type<any>>=[];//所有ref列表
  const errorMessages: Array<string> = [];
  validateSwaggerApi(errorMessages);
  //校验SwaggerClass 中的配置
  validateSwaggerClass(errorMessages);
  if (errorMessages.length > 0) {
    console.error("-------swagger 配置异常---------------")
    console.error(errorMessages.join("\r\n"));
    return null;
    console.error("-------swagger 配置异常结束---------------")
  }
  swaggerFieldCfgList.map((fieldCfg, index) => {
    if (!swaggerClassMap.has(fieldCfg.target)) {
      swaggerClassMap.set(fieldCfg.target, []);
    }
    swaggerClassMap.get(fieldCfg.target)!.push(fieldCfg);
  });
  const definitions = handlerSwaggerDefinitions(swaggerClassMap);
  const paths: { [key: string]: { [key: string]: any } } = {};
  swaggerApiList.map((swaggerApiCfg, idx) => {
    if (!paths.hasOwnProperty(swaggerApiCfg.path!)) {
      paths[swaggerApiCfg.path!] = {};
    }
    const path = paths[swaggerApiCfg.path!];
    path[swaggerApiCfg.httpMethod!] = {
      tags: swaggerApiCfg.tags,
      summary: swaggerApiCfg.summary,
      description: swaggerApiCfg.description,
      operationId: swaggerApiCfg.name,
      produces: swaggerApiCfg.produces
    };
    //------------parameters--------------
    path["parameters"] = handerSwaggerApiCfgParameters(swaggerApiCfg);
    //------------responses--------------
    path["responses"] = handerSwaggerApiCfgResponse(swaggerApiCfg);

  });
  return {
    paths, definitions
  }
};



function handlerSwaggerDefinitions(swaggerClassMap: Map<CommonTypes.Type<any>, SwaggerTypes.SwaggerFieldCfg[]>) {
  const definitions: {
    [key: string]: {
      [key: string]: any;
    };
  } = {};
  //加入所有SwaggerClass类
  swaggerClassCfgList.map((classCfg, idx) => {
    definitions[classCfg.className] = {
      type: classCfg.type,
      required: [],
      properties: {} //field
    };
    //配置SwaggerClass的 字段属性
    const fieldCfgs = swaggerClassMap.get(classCfg.target.prototype);
    definitions[classCfg.className].required = fieldCfgs!
      .filter(fieldCfg => fieldCfg.required)
      .map(fieldCfg => fieldCfg.name);
    fieldCfgs!.map((fieldCfg, idx) => {
      if (fieldCfg.type === "array") {
        definitions[classCfg.className].properties[fieldCfg.name] = {
          type: "array",
          items: {
            $ref: `#/definitions/${fieldCfg.ref!.name}`
          }
        };
        return;
      }
      if (fieldCfg.ref) {
        //判断是否有这个类的class
        definitions[classCfg.className].properties[fieldCfg.name] = {
          $ref: `#/definitions/${fieldCfg.ref.name}`
        };
        return;
      }
      definitions[classCfg.className].properties[fieldCfg.name] = {
        type: fieldCfg.type,
        format: fieldCfg.format
      };
    });
  });
  return definitions;
}

function handerSwaggerApiCfgParameters(swaggerApiCfg:
  SwaggerTypes.SwaggerApiCfg) {
  const parameters: { [key: string]: any } = [];
  const changeToSwaggerParamJson = (cfg: SwaggerTypes.SwaggerParameterCfg) => {
    return {
      name: cfg.key,
      in: cfg.inType,
      description: cfg.description,
      type: cfg.parseDataType,
      required: cfg.required
    };
  };

  console.log(swaggerApiCfg);
  console.log(swaggerParameterCfgList);

  const thisParameterCfgs=  swaggerParameterCfgList
  .filter((cfg, idx) => {
    return cfg.target === swaggerApiCfg.target && cfg.name === swaggerApiCfg.name;
  });
  console.log(thisParameterCfgs);
  thisParameterCfgs. map(cfg => {
      if (cfg.inType === "path" ||
        cfg.inType === "header" ||
        cfg.inType === "formData") {
        parameters.push(changeToSwaggerParamJson(cfg));
      }
      else if (cfg.inType === "query") {
        if (cfg.isArray) {
          parameters.push({
            name: cfg.key, in: cfg.inType, required: cfg.required,
            description: cfg.description,
            schema: {
              type: "array",
              items: { type: cfg.parse, }
            }
          });
        }
        else {
          parameters.push(changeToSwaggerParamJson(cfg));
        }
      }
      else if (cfg.inType === "body") {
        if (cfg.isArray) {
          parameters.push({
            name: cfg.key, in: cfg.inType, required: cfg.required,
            description: cfg.description,
            schema: {
              type: "array",
              items: {
                $ref: `#/definitions/${cfg.ref!.name}`
              }
            }
          });
        }
        else {
          parameters.push({
            name: cfg.key, in: cfg.inType, required: cfg.required,
            description: cfg.description, schema: {
              $ref: `#/definitions/${cfg.ref!.name}`
            }
          });
        }
      }
    });
  return parameters;
}

function handerSwaggerApiCfgResponse(swaggerApiCfg: SwaggerTypes.SwaggerApiCfg) {
  const responses: {
    [key: string]: any;
  } = {};
  swaggerApiResultList.map(resultCfg => {
    if (resultCfg.target === swaggerApiCfg.target &&
      resultCfg.name === swaggerApiCfg.name) {
      if (resultCfg.type === "string") {
        responses[resultCfg.code] = { description: resultCfg.description };
      }
      else if (resultCfg.type === "object") {
        responses[resultCfg.code] = {
          description: resultCfg.description,
          schema: { $ref: `/definitions/${resultCfg.ref!.name}` }
        };
      }
      else if (resultCfg.type === "array") {
        responses[resultCfg.code] = {
          description: resultCfg.description,
          schema: { items: { $ref: `/definitions/${resultCfg.ref!.name}` } }
        };
      }
      else {
        //TODO:构建分页对象
        //pagination
      }
    }
  });
  return responses;
}