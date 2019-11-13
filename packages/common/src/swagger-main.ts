import * as swagger from "swagger2";
import Koa from "koa";
import body from "koa-body";
import koaBody from "koa-body";
import { ui } from "swagger2-koa";

// load YAML swagger file
let app = new Koa();
app.use(body());

async function initSwagger() {
  const document = swagger.loadDocumentSync(__dirname + "/swagger.yml");
  if (!swagger.validateDocument(document)) {
    throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
  } else {
    //@ts-ignore
    app.use(ui(document, "/swagger"));
    //app.use(createKoaMiddleware(swagger.validateDocument(document)));
  }
}

initSwagger()
  .then(() => {
    app.listen(3000, () => {
      console.log("swagger 测试 启动 3000");
    });
  })
  .catch(err => console.error(err));

