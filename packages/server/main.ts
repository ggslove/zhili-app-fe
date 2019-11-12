import Koa from "koa";
import { db1 } from "./src/config/DbCfg";
import { bootstrapControllers } from "./src/decorator/BootController";

const app = new Koa();
const KOA_PORT = 3000;

async function init() {
  const dbConnect = await db1;
  await bootstrapControllers(app, {
    controllers: [__dirname + "/src/controller/*.controller.ts"],
    basePath: "/api"
  });
}

init()
  .then(something => {
    app.listen(KOA_PORT, () => {
      console.log(`Koa 服务启动  at port:${KOA_PORT}`);
    });
  })
  .catch(err => console.error(err));
