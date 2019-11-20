/// <reference path = "../types/CommonTypes.ts" /> 
import {
  swaggerApiList,
  swaggerParameterCfgList,
  swaggerClassCfgList,
  swaggerFieldCfgList,
  swaggerApiResultList,
} from "./";
import { SwaggerTypes } from "../types/SwaggerTypes";
import { ErrorMessage } from "../util";
export const validateSwaggerApi = (errMessages: Array<string>) => {
  swaggerApiList.map((cfg, idx) => {
    try {
      eachValidateSwaggerApiCfg(cfg, idx);
    } catch (err) {
      errMessages.push(err.message);
    }
  });
};

const eachValidateSwaggerApiCfg = (cfg: SwaggerTypes.SwaggerApiCfg, index: number) => {
  const em = new ErrorMessage(`swaggerApiList 中第${index}条数据`);
  if (!cfg.target) {
    throw new Error(em.fieldNotFound("target"));
  }
  const targetName = cfg.target.name;
  em.setBase(`${em.getBase},${targetName}`);
  if (!cfg.name) {
    throw new Error(em.fieldNotFound("name"));
  }
  if (!cfg.path) {
    throw new Error(em.fieldNotFound("path"));
  }
  if (!cfg.httpMethod) {
    em.fieldNotFound("httpMethod");
  }
  if (!cfg.tags || cfg.tags.length == 0) {
    cfg.tags = ["default"];
  }
  if (!cfg.produces || cfg.produces.length == 0) {
    cfg.produces = ["application/json"];
  }
};

export const validateSwaggerClass = (errorMessages: Array<string>) => {
  //class
  const allClassList = swaggerClassCfgList.map(it => it.target.prototype);
  const allFieldTargetList: Array<CommonTypes.Type<any>> = [];
  //校验swaggerFieldCfgList
  swaggerFieldCfgList.map((fieldCfg, idx) => {
    try {
      eachValidateSwaggerFieldCfg(fieldCfg, idx);
    } catch (err) {
      errorMessages.push(err.message);
    }

    //字段-> 类
    //todo 
    // if (allClassList.indexOf(fieldCfg.target) == -1) {
    //   errorMessages.push(
    //     `allClassList${idx}条数据的ref,ref为${fieldCfg.ref!.name}没有@SwaggerClass类型`
    //   );
    // }
    //加入allFieldTargetList 
    if (allFieldTargetList.indexOf(fieldCfg.target) == -1) {
      allFieldTargetList.push(fieldCfg.target);
    }
  });

  swaggerApiResultList.map((apiCfg, idx) => {
    //校验result参数
    try {
      eachValidateSwaggerApiResultCfg(apiCfg, idx);
    } catch (err) {
      errorMessages.push(err.message);
    }
    //校验 ref 必须存在
    if (apiCfg.type != "string" && apiCfg.ref && allClassList.indexOf(apiCfg.ref.prototype) == -1) {
      errorMessages.push(
        `swaggerApiResultList${idx}条数据的ref,ref为${apiCfg.ref!.name}没有@SwaggerClass类型`
      );
    }

    swaggerParameterCfgList.map((paramCfg, idx) => {
      try {
        eachValidateSwaggerParameterCfg(paramCfg, idx);
      } catch (err) {
        errorMessages.push(err.message);
      }
      if (
        ( paramCfg.parse === "object") &&
        paramCfg.ref &&
        allClassList.indexOf(paramCfg.ref.prototype) == -1
      ) {
        errorMessages.push(
          `swaggerParameterCfgList第${idx}条数据的ref,ref为${paramCfg.ref!.name}没有@SwaggerClass类型`
        );
      }
    });
  });

  //校验 swaggerClassCfgList 中是否有字段配置
  swaggerClassCfgList.map((classCfg, idx) => {
    if (allFieldTargetList.indexOf(classCfg.target.prototype) === -1) {
      errorMessages.push(`swaggerClassCfgList中第${idx}条数据，${classCfg.target.name}没有field配置`);
    }
  });
};

const eachValidateSwaggerFieldCfg = (cfg: SwaggerTypes.SwaggerFieldCfg, index: number) => {
  const em = new ErrorMessage(`swaggerFieldCfgList中第${index}条数据`);
  if (cfg.type == "array" || cfg.type === "object") {
    if (!cfg.ref) {
      throw new Error(em.appendBasefieldNotFound("type为array|object", "ref"));
    }
  }
};

const eachValidateSwaggerApiResultCfg = (
  resultCfg: SwaggerTypes.SwaggerApiResultCfg,
  index: number
) => {
  const em = new ErrorMessage(
    `swaggerApiResultList 中第${index}条数据,target为${resultCfg.target.name},`
  );
  if (resultCfg.type === "string") {
    if (resultCfg.description === undefined) {
      throw new Error(em.fieldNotFound("description"));
    }
  } else {
    if (!resultCfg.ref) {
      throw new Error(em.fieldNotFound("ref"));
    }
  }
};

// type-> query 时， parse为 number,array

/**
 *
 * query-> 基本类型，array(item-> 基本类型):
 * body-> 对象，array schema:{$ref: "#/definitions/User"}
 * path -> 基本类型
 * header -> 基本类型
 * formData-> 基本类型
 *  @param cfg
 *  @param index
 */

const eachValidateSwaggerParameterCfg = (
  cfg: SwaggerTypes.SwaggerParameterCfg,
  index: number
) => {
  if (
    cfg.inType === "path" ||
    cfg.inType === "header" ||
    cfg.inType === "formData"
  ) {
    if (cfg.ref) {
      throw new Error(
        `swaggerApiResultList 中第${index}条数据,target为${cfg.target.name},{inType:path|header|formData},ref不需要设置`
      );
    }
  } 
  
  if (cfg.inType === "query") {
    if (cfg.ref||cfg.parse==='object') {
      throw new Error(
        `swaggerApiResultList 中第${index}条数据,target为${cfg.target.name},{inType:query},parse不能为object,ref不需要设置`
      );
    }
  } 

  if(cfg.inType==='body'){
    if(cfg.isArray){
        if(cfg.parse!=='object'||!cfg.ref){
          throw new Error(
            `swaggerApiResultList中第${index}条数据,target为${cfg.target.name},{inType:object时},parse必须为object,ref必须设置`
          );
        }
    }
  }
};
