import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import log4js from 'log4js';
const logger =log4js.getLogger("Mock.router.ts");
var workDir = path.resolve('.');
const mockPath = path.join(workDir, "/mock/");
logger.info('mockPath is ' + mockPath);
const routerOpts: Router.IRouterOptions = {
  prefix: '/mock',
};
//读取 mock 文件路径
const router = new Router(routerOpts);


router.get("/", async cxt => {
  const filenames: string[] = fs.readdirSync(mockPath);
  // cxt.body= `
  //       <html>
  //         <head></head>
  //         <body>
  //           <ul>
  //             ${filenames.map(filename=>'<li>'+filename+'</li>')}
  //           </ul>
  //         </body>
  //       </html>
  // `
  // filenames.map(filename=> {
  //   const methods=fs.readdirSync(path.join(mockPath,`/${filename}/`));
  //   return (methods.map(method=> filenames+"."+method.replace(".js","")));
  // }).reduce((prev,next)=> prev.concat(next)).join(",")
  cxt.body = "所有接口界面"
});

router.all("/:path1/:path2", async ctx => {
  const path1 = ctx.params.path1;
  const path2 = ctx.params.path2;
  ctx.body = require(`${mockPath}/${path1}/${path2}.js`)
  ctx.status = 200;
})
export default router;  



