'use strict';
const Controller = require('egg').Controller;

class ProxyController extends Controller {
  async index() {
    const { ctx, service } = this;
    const res = await service.proxy.index(); // 代理
    ctx.body = res;
  }
}

module.exports = ProxyController;
