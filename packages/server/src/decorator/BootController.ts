import Koa, { Context, Request, Response } from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import "reflect-metadata";
import { importClassesFromDirectories } from "../util/importClasses";
import { controllerList } from "./ControllerDecorator";
import { routeList } from "./MethodDecorator";
import { ParamType, paramList } from "./ParamDecorator";
import { ParseType, parseList } from "./ParseDecorator";
import { Injector } from "./Injector";

const router = new Router();
type NextFunction = () => Promise<any>;

export interface IKoaControllerOptions {
  controllers: Array<string>;
  basePath?: string;
  versions?: Array<number | string> | object;
  disableVersioning?: boolean;
  initBodyParser?: boolean;
  boomifyErrors?: boolean;
  attachRoutes?: boolean;
  router?: any;
  flow?: Array<Function>;
}

export let options: IKoaControllerOptions;
export const bootstrapControllers = async (
  app: Koa,
  params: IKoaControllerOptions
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
  app.use(routes);
};

function controllerToRoutes(params: IKoaControllerOptions) {
  controllerList.forEach(controller => {
    const { path: basePath, target: cTarget } = controller;
    // 反射具体实现类创建
    const ctl = Injector.resolveObj(cTarget);
    routeList
      .filter(({ target }) => target === cTarget.prototype)
      .forEach(route => {
        const { name: funcName, type, path, func } = route;
        const handler = handlerFactory(
          ctl,
          func,
          paramList.filter(param => param.name === funcName),
          parseList.filter(parse => parse.name === funcName)
        );
        router[type](
          `${params.basePath ? params.basePath : ""}${basePath}${path}`,
          handler
        );
        // use handler方法
      });
  });
  return router.routes();
}

function handlerFactory(
  ctl: object,
  func: (...args: any[]) => any,
  paramList: ParamType[],
  parseList: ParseType[]
) {
  return async (ctx: Context, next: NextFunction) => {
    try {
      // 获取路由函数的参数
      const args = extractParameters(
        ctx.request,
        ctx.response,
        next,
        paramList,
        parseList
      );
      // 使用方法 apply具体对象，参数
      const result = await func.apply(ctl, args);
      ctx.body = result;
    } catch (err) {
      // 处理异常
      throw err;
    }
  };
}

function extractParameters(
  req: Request,
  res: Response,
  next: NextFunction,
  paramArr: ParamType[] = [],
  parseArr: ParseType[] = []
) {
  if (!paramArr.length) return [req, res, next];

  const args: any[] = [];
  // 进行第三层遍历
  paramArr.forEach(param => {
    const { key, index, type } = param;
    // 获取相应的值，如 @Query('id') 则为 req.query.id
    switch (type) {
      case "query":
        args[index] = key ? req.query[key] : req.query;
        break;
      case "body":
        args[index] = key ? req.body[key] : req.body;
        break;
      case "headers":
        args[index] = key ? req.headers[key.toLowerCase()] : req.headers;
        break;
      // ...
    }
  });

  // 小优化，处理参数类型
  parseArr.forEach(parse => {
    const { type, index } = parse;
    switch (type) {
      case "number":
        args[index] = +args[index];
        break;
      case "string":
        args[index] = args[index] + "";
        break;
      case "boolean":
        args[index] = Boolean(args[index]);
        break;
    }
  });
  args.push(req, res, next);
  return args;
}
