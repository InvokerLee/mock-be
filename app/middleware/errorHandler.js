'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.logger.error('error', err);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const errorMsg = status === 500 && app.config.env === 'prod' ?
        'Internal Server Error' :
        err.message;

      ctx.body = {
        code: status,
        msg: errorMsg,
        result: null,
      };
    }
  };
};
