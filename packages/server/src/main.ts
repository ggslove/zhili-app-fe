import Koa from "koa";
import { db1 } from "src/config/DbCfg";
import { bootstrapControllers } from "@zhili/common/src/boot";
import { swaggerDoc } from "./config/Info";
import Router from "koa-router";
import { router } from "swagger2-koa";
import fs from "fs";

const app = new Koa();
const KOA_PORT = 3000;

async function init() {
  const dbConnect = await db1;
  await bootstrapControllers(app, {
    initBodyParser: true,
    controllers: [
      __dirname + "/controller/*.controller.ts",
      __dirname + "/dto/*.dto.ts"
    ],
    swaggerDoc
  });
}

// app.use((ctx, next) => {
//   var contents = fs.readFileSync(__dirname+"/test.json",'utf-8');
//   ctx.body =  JSON.parse(contents);
// });

// const r = new Router();

// app.use(r.routes());

init()
  .then(something => {
    app.listen(KOA_PORT, () => {
      console.log(`Koa 服务启动  at port:${KOA_PORT}`);
    });
  })
  .catch(err => console.error(err));
