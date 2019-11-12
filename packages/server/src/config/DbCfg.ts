import { createConnection, Connection } from "typeorm";
//__dirname 这里如果不加 __dirname 不能识别entitiy文件
export const db1: Promise<Connection> = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  entities:[__dirname+'/../../../character-tag/src/entity/*.entity.ts'],
  database: "test",
  logging:true,
  synchronize:true
});