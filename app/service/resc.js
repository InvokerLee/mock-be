'use strict';
const Service = require('egg').Service;


class RescService extends Service {
  async list(payload) {
    const { currentPage, pageSize, rescName, rescPath, system } = payload;
    if (!currentPage || !pageSize) {
      this.ctx.throw(405, '参数错误');
    }
    const params = {};
    if (rescName) {
      params.rescName = { $regex: rescName };
    }
    if (rescPath) {
      params.rescPath = { $regex: rescPath };
    }
    if (system) {
      params.system = system;
    }

    const skip = (Number(currentPage) - 1) * Number(pageSize);
    const result = await Promise.all([
      this.ctx.model.Resc.countDocuments(params).exec(),
      this.ctx.model.Resc.find(params)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(pageSize))
        .populate({
          path: 'system',
          select: 'host port ip scheme',
        })
        .exec(),
    ]);

    return {
      totalRow: result[0],
      dataList: result[1],
      currentPage: Number(currentPage),
      pageSize: Number(pageSize),
    };
  }

  async insert(payload) {
    const { rescPath, system } = payload;
    const r = await this.ctx.model.Resc.findOne({ rescPath, system });
    if (r) {
      this.ctx.throw(405, '该系统资源已存在，请勿重复添加');
    }
    return this.ctx.model.Resc.create(payload);
  }
  async insertMany(payload) {
    if (!Array.isArray(payload)) {
      this.ctx.throw(405, '参数错误');
    }
    const existItems = await this.ctx.model.Resc.find({
      rescPath: { $in: payload.map(v => v.rescPath) },
      system: { $in: payload.map(v => v.system) },
    }).exec();
    const existPaths = existItems.map(v => v.rescPath);

    const newItems = payload.filter(v => !existPaths.includes(v.rescPath));
    await this.ctx.model.Resc.create(newItems);
    return {
      success: newItems,
      fail: existItems,
    };
  }
  async update(payload) {
    const { _id, rescPath, system } = payload;
    if (!_id) {
      this.ctx.throw(405, '参数错误');
    }
    const r = await this.ctx.model.Resc.findById(_id);
    if (!r) {
      this.ctx.throw(404, '找不到该资源');
    }
    const existR = await this.ctx.model.Resc.findOne({ rescPath, system, _id: { $ne: r._id } });
    if (existR) {
      this.ctx.throw(405, '该系统资源已存在，请勿重复添加');
    }
    return this.ctx.model.Resc.findByIdAndUpdate(_id, payload);
  }
  async delete(payload) {
    return this.ctx.model.Resc.remove({ _id: { $in: payload.ids } });
  }
  async switchProxy(payload) {
    const { rescId } = payload;
    if (!rescId) {
      this.ctx.throw(405, '参数错误');
    }
    const res = await this.ctx.model.Resc.findById(rescId).exec();
    if (!res) {
      this.ctx.throw(404, '找不到该资源');
    }

    return this.ctx.model.Resc.updateOne({ _id: rescId }, { isProxy: !res.isProxy });
  }

  // async removes(values) {
  //   return this.ctx.model.Resc.remove({ _id: { $in: values } })
  // }
}

module.exports = RescService;

