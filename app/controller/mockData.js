'use strict';

const Controller = require('egg').Controller;

class MockDataController extends Controller {
  async list() {
    const { ctx, service } = this;
    const query = ctx.request.query || {};
    const res = await service.mockData.list(query);
    ctx.helper.success({ ctx, res });
  }

  async insert() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.mockData.insert(payload);
    ctx.helper.success({ ctx });
  }
  async update() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.mockData.update(payload);
    ctx.helper.success({ ctx });
  }
  async setPriority() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.mockData.setPriority(payload);
    ctx.helper.success({ ctx });
  }
  async delete() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    await service.mockData.delete(payload);
    ctx.helper.success({ ctx });
  }
}

module.exports = MockDataController;
