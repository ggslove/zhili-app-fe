
import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import koaBody from 'koa-body';
import LogUtil from './LogUtil';
import { PackageUtil } from './PackageUtil';
import { promisify } from './util';
const projectPath = path.resolve('.');

//TODO： 读取ts编译目录，这里需要修改为目标路径
const srcRouterPath = path.join(projectPath, '/src/routers');
const readdirAsync = promisify(fs.readdir);
const logger = LogUtil.getLogger("src/init/initRouter");
const extRouterPath = process.env.EXT_ROUTER_PATH ? process.env.EXT_ROUTER_PATH : undefined;//其他文件夹

//判断package.json是否包含@zhili/server-mock dependency//如果包含则需要加载@zhili/server-mock
logger.debug("projectPath:" + projectPath)
logger.debug("extRouterPath:" + extRouterPath);

const cachError = (err: Error) => {
  logger.error(err);
  return new Array();
}
const zhili_mock_depencyName = "@zhili/server-mock";
const path_zhili_mock_depencyName="\@zhili/server-mock";
export default async function initRouters(app: Koa) {
  const packageUtil = await PackageUtil;
  const allRouterPaths = [srcRouterPath];//所有路径
  if (packageUtil.doExpr(`dependencies.'${zhili_mock_depencyName}'`) || packageUtil.doExpr(`devDependencies.
  '${zhili_mock_depencyName}'`)) {
    allRouterPaths.push(path.join(projectPath, `./node_modules/${path_zhili_mock_depencyName}/src/routers`))
  }
  if (extRouterPath) {
    allRouterPaths.push(...extRouterPath.split(","));
  }
  const routersArray = await Promise.all(allRouterPaths.map(path => getRoutersInPath(path))).catch((error) => { logger.error(error); return new Array(new Array()) });
  [koaBody()].concat(routersArray.reduce((prev, next) => prev.concat(next))).forEach(
    middleWare => app.use(middleWare)
  );
}

async function getRoutersInPath(routerPath: string) {
  if (!routerPath) { return new Array(); }
  const isInDepency=routerPath.indexOf("node_modules")!=-1
  logger.debug("加载 routerPath 路径为: " + routerPath);
  const filenames: string[] = await readdirAsync(routerPath).catch(cachError);
  const routerModules = await Promise.all(
    filenames.filter(name=> {
      if(isInDepency){ 
          return name.endsWith("js"); 
        }else{
          //非depency 目录 使用 ts文件
          return name.endsWith("ts")
        }
      }
    ).map(async filename => await import(`${routerPath}/${filename}`).catch(cachError)
    ));
  return routerModules.map(defaultModule => {
    if (defaultModule.default) {
      if (defaultModule.default.opts) {
        logger.warn("加载路由prefix为:" + defaultModule.default.opts.prefix)
      }
      return defaultModule.default.routes();
    } else {
      return undefined;
    }
  }).filter(it => it);
}

