'use strict';

const Controller = require('egg').Controller;

class RescController extends Controller {
  async list() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    const res = await service.resc.list(query);
    ctx.helper.success({ ctx, res });
  }

  async insert() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.resc.insert(payload);
    ctx.helper.success({ ctx });
  }
  async insertMany() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.resc.insertMany(payload);
    ctx.helper.success({ ctx, res });
  }
  async update() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.resc.update(payload);
    ctx.helper.success({ ctx });
  }
  async delete() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.resc.delete(payload);
    ctx.helper.success({ ctx });
  }
  async switchProxy() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    await service.resc.switchProxy(query);
    ctx.helper.success({ ctx });
  }
}

module.exports = RescController;
