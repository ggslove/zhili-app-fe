/// <reference path = "../../../common/src/types/CommonTypes.ts" />
const info: CommonTypes.SwaggerInfo = {
  host: "localhost",
  title: "宇宙无敌大系统",
  version: "1.0"
};
const basePath = "/api";
export const swaggerDoc: CommonTypes.SwaggerDoc = {
  swagger: "2.0",
  version: "v1",
  basePath,
  info
};
