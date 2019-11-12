import Koa from 'koa';
import initRouter from './initRouter';
import LogUtil from './LogUtil';
const logger=LogUtil.getLogger('main.ts');
const app = new Koa();

initRouter(app).catch(error=> logger.error(error));
const enableMockServer = process.env.ENABLE_MOCK_SERVER;
const mockPort = process.env.MOCK_PORT ? Number.parseInt(process.env.MOCK_PORT) : 3000;
if (enableMockServer) {
  // initRouter(app).then(()=>{
    app.listen(mockPort,
      () => logger.info(`mock server is started at port: ${mockPort}!`))
  // }).catch(err=> logger.error(err))
}