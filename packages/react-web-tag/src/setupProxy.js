// @ts-ignore
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api/', {
      target: 'http://127.0.0.1:3002/',
      ws: true,
      secure: false,
      pathRewrite: {
        '^/api/': '',
      },
    }),
  );
  app.use(
    proxy('/mockApi/', {
        target: 'http://127.0.0.1:3333/mock/',
        ws: true,
        secure: false,
        pathRewrite: {
            '^/mockApi/': '',
        },
    }),
  );
};
