import log4js from 'log4js';

export interface LogUtil {
  getLogger:()=>log4js.Logger
}

export default (()=>{
  log4js.configure({
    appenders: {
      out: { type: 'stdout' },
      app: { type: 'file', filename: './log/application.log' }
    },
    categories: {
      // getLogger 参数为空时，默认使用该分类
      default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
  });
    return {getLogger: log4js.getLogger}
  }
)()




