'use strict';
const Service = require('egg').Service;


class MockDataService extends Service {
  async list(payload) {
    const { rescId } = payload;
    if (!rescId) {
      this.ctx.throw(405, '参数错误');
    }

    const result = await this.ctx.model.MockData.find({ rescId })
      .sort({ createdAt: -1 })
      .exec();

    return result;
  }

  async insert(payload) {
    const res = await this.ctx.model.MockData.create(payload);
    if (payload.isPriority) {
      await this.setOtherPriorityFalse(res);
    }
    return res;
  }
  async update(payload) {
    const { _id } = payload;
    if (!_id) {
      this.ctx.throw(405, '参数错误');
    }
    const res = await this.ctx.model.MockData.findById(_id);
    if (!res) {
      this.ctx.throw(404, '找不到该资源');
    }
    await this.ctx.model.MockData.updateOne({ _id }, payload);

    if (payload.isPriority) {
      await this.setOtherPriorityFalse(res);
    }
    return;
  }
  async setPriority(payload) {
    const { _id, isPriority } = payload;
    if (!_id && !isPriority) {
      this.ctx.throw(405, '参数错误');
    }
    const res = await this.ctx.model.MockData.findById(_id);
    if (!res) {
      this.ctx.throw(404, '找不到该资源');
    }
    await this.ctx.model.MockData.updateOne({ _id }, { isPriority });

    if (payload.isPriority) {
      await this.setOtherPriorityFalse(res);
    }
    return;
  }
  async delete(payload) {
    if (!payload._id) {
      this.ctx.throw(405, '参数错误');
    }
    return this.ctx.model.MockData.remove({ _id: payload._id });
  }

  async setOtherPriorityFalse({ _id, rescId }) {
    if (!_id && !rescId) return;
    await this.ctx.model.MockData.updateMany({ _id: { $ne: _id }, rescId }, { isPriority: false });
  }
  // async removes(values) {
  //   return this.ctx.model.Resc.remove({ _id: { $in: values } })
  // }
}

module.exports = MockDataService;

