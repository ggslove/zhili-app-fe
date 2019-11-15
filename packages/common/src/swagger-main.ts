import Koa from "koa";
import body from "koa-body";
import { ui } from "swagger2-koa";
import { Document, Info, PathItem } from "swagger2/src/schema";
import * as swagger from "swagger2";

// load YAML swagger file
let app = new Koa();
app.use(body());

const userpath: { [key: string]: PathItem } = {
  "/user/{username}": {
    get: {
      tags: ["User"],
      parameters: [
        {
          name: "username",
          in: "path",
          type: "string"
        }
      ],
      responses: {
        "400": {
          description: "我出错了"
        },
        "200": {
          description: "我成功了",
          schema: {
            type: "object",
            $ref: "#/definitions/User"
          }
        }
      }
    },
    post:{
      tags: ["User"],
      parameters: [
        {
          name: "body",
          in: "body",
          description:"User Object that need to be added to the store",
          required:true,
          schema:{
            $ref:"#/definitions/User"
          }
        }
      ],
      responses: {
        "400": {
          description: "我出错了"
        },
        "200": {
          description: "我成功了",
          schema: {
            type: "object",
            $ref: "#/definitions/User"
          }
        }
      }
    }
  }
};

async function initSwagger() {
  const document: Document = {
    swagger: "2.0",
    info: { title: "测试", version: "1.0" },
    paths: {
      ...userpath
    },
    definitions: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64"
          },
          username: {
            type: "string"
          },
          status: {
            type: "string",
            enum: ["placed", "approved", "delivered"]
          }
        }
      }
    }
  };
  app.use(ui(document, "/swagger"));

  // const document2 = swagger.loadDocumentSync(__dirname + "/swagger.yml");
  // if (!swagger.validateDocument(document2)) {
  //   throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
  // } else {
  //   //@ts-ignore
  //   app.use(ui(document2, "/swagger2"));
  // }
}

initSwagger()
  .then(() => {
    app.listen(3000, () => {
      console.log("swagger 测试 启动 3000");
    });
  })
  .catch(err => console.error(err));
