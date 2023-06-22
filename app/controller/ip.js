'use strict';

const Controller = require('egg').Controller;

class IpController extends Controller {
  async list() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    const res = await service.ip.list(query);
    ctx.helper.success({ ctx, res });
  }
  async findIps() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    const res = await service.ip.findIps(query);
    ctx.helper.success({ ctx, res });
  }
  async insert() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.ip.insert(payload);
    ctx.helper.success({ ctx });
  }
  async update() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.ip.update(payload);
    ctx.helper.success({ ctx });
  }
  async delete() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.ip.delete(payload);
    ctx.helper.success({ ctx });
  }
}

module.exports = IpController;
