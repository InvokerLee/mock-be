'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, friend!';
  }
  async tryConnect() {
    const { ctx, service } = this;
    const res = await service.base.tryConnect(ctx.request.query || {});
    ctx.helper.success({ ctx, res });
  }
}

module.exports = BaseController;
