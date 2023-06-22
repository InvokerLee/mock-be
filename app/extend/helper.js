// 处理成功响应
exports.success = ({ ctx, res = null, msg = '' }) => {
  ctx.body = {
    code: 200,
    result: res,
    msg,
  };
  ctx.status = 200;
};

