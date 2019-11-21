/// <reference path = "../types/CommonTypes.ts" />
import Koa, { Context, Request, Response } from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import "reflect-metadata";
import { controllerList, routeList, paramList } from "../mvc/";
import { importClassesFromDirectories, Injector,findKeyNameValueInPath } from "../util/";
import { handlerSwaggerToDocument } from "../swagger/SwaggerHandler";
import { SwaggerTypes } from "../types/SwaggerTypes";
import { ui } from "swagger2-koa";
import {Document} from 'swagger2/src/schema';



const router = new Router();
export let options: CommonTypes.IKoaControllerOptions;
export const bootstrapControllers = async (
  app: Koa,
  params: CommonTypes.IKoaControllerOptions
) => {
  options = params;
  options.versions = options.versions || { 1: true };
  options.flow = options.flow || [];
  options.boomifyErrors = params.boomifyErrors === false ? false : true;

  /**
   * Versions can be defined in multiple ways.
   * If an array, it's just a list of active versions.
   * If as an object, then this datastructure can define not only active versions but obsolete versions as well.
   *
   * The object is the native form. Arrays are converted to object.
   */
  if (Array.isArray(options.versions)) {
    const versions: { [key: string]: any } = {};
    options.versions.forEach(version => {
      versions[version] = true;
    });
    options.versions = versions;
  }

  if (!options.router) {
    options.router = new (require("koa-router"))();
    options.attachRoutes = true;
  }
  // 加载js类
  importClassesFromDirectories(options.controllers);

  if (params.initBodyParser) {
    // Enable bodyParser with default options
    app.use(require("koa-body")({ multipart: true }));
    // app.use((require('koa-bodyparser'))());
    // app.use(bodyParser());
  }
  const routes = controllerToRoutes(params);

  app.use(ui((handlerSwaggerToDocument(options) as Document), "/swagger"));

  app.use(routes);
};

function controllerToRoutes(options: CommonTypes.IKoaControllerOptions) {
  controllerList.forEach(controller => {
    const { path: basePath, target: cTarget } = controller;
    // 反射具体实现类创建
    const ctl = Injector.resolveObj(cTarget);
    routeList
      .filter(({ target }) => target === cTarget.prototype)
      .forEach(route => {
        const { name: funcName, type, path, func } = route;
        const fullPath=`${options.swaggerDoc.basePath ? options.swaggerDoc.basePath : ""}${basePath}${path}`;
        const handler = handlerFactory(
          ctl,
          fullPath,
          func,
          paramList.filter(
            param =>
              param.name === funcName && param.target === cTarget.prototype
          )
        );
        router[type](fullPath, handler);
        // use handler方法
      });
  });

  console.log(router.routes());
  return router.routes();
}




function handlerFactory(
  ctl: object,
  path:string,
  func: (...args: any[]) => any,
  paramList: SwaggerTypes.ParamConfig[]
) {
  return async (ctx: Context, next: CommonTypes.NextFunction) => {
    try {
      // 获取路由函数的参数
      const args = extractParameters(
        path,
        ctx.request,
        ctx.response,
        next,
        paramList
      );
        const result = await func.apply(ctl, args);
        ctx.body = result;
    } catch (err) {
      //TODO:错误日志输出到文件中
      console.error(err);
      ctx.body = err.message;
      ctx.status=500;
    }
  };
}

function parseData(value: any, parse: SwaggerTypes.ParseType) {
  if (!parse) {
    return value;
  }
  switch (parse) {
    case "integer":
      value = +value;
      break;
    case "string":
      value = value + "";
      break;
    case "boolean":
      value = Boolean(value);
      break;
  }
  return value;
}

function extractParameters(
  path:string,
  req: Request,
  res: Response,
  next: CommonTypes.NextFunction,
  paramArr: SwaggerTypes.ParamConfig[] = []
) {
  if (!paramArr.length) return [req, res, next];
  const args: any[] = [];
  // 进行第三层遍历
  paramArr.forEach(param => {
    const { key, index, inType, parse } = param;
    // 获取相应的值，如 @Query('id') 则为 req.query.id
    switch (inType) {
      case "query":
        args[index] = key ? req.query[key] : req.query;
        break;
      case "body":
        args[index] = key
          ? key === "body"
            ? req.body
            : req.body[key]
          : req.body;
        break;
      case "header":
        args[index] = key ? req.headers[key.toLowerCase()] : req.headers;
        break;
      case "path":
        args[index] = findKeyNameValueInPath(req.url,path ,key);
        break;
      // ...
    }
    args[index] = parseData(args[index], parse);
  });

  // 小优化，处理参数类型
  args.push(req, res, next);
  return args;
}

