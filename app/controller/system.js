'use strict';

const Controller = require('egg').Controller;

class SystemController extends Controller {
  async list() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    const res = await service.system.list(query);
    ctx.helper.success({ ctx, res });
  }
  async all() {
    const { ctx, service } = this;
    const res = await service.system.all();
    ctx.helper.success({ ctx, res });
  }
  async insert() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.system.insert(payload);
    ctx.helper.success({ ctx });
  }
  async update() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.system.update(payload);
    ctx.helper.success({ ctx });
  }
  async delete() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.system.delete(payload);
    ctx.helper.success({ ctx });
  }
  async resolveSwagger() {
    const { ctx, service } = this;
    const payload = ctx.request.query || {};
    const res = await service.system.resolveSwagger(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = SystemController;
