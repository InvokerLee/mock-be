'use strict';
const Service = require('egg').Service;


class IpService extends Service {
  async list(payload) {
    const { currentPage, pageSize, username } = payload;
    if (!currentPage || !pageSize) {
      this.ctx.throw(405, '参数错误');
    }
    const params = {};
    if (username) {
      params.username = { $regex: username };
    }

    const skip = (Number(currentPage) - 1) * Number(pageSize);
    const result = await Promise.all([
      this.ctx.model.Ip.countDocuments(params).exec(),
      this.ctx.model.Ip.find(params).sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(pageSize))
        .exec(),
    ]);

    return {
      totalRow: result[0],
      dataList: result[1],
      currentPage: Number(currentPage),
      pageSize: Number(pageSize),
    };
  }

  async findIps(payload) {
    const { username } = payload;
    if (!username) {
      this.ctx.throw(405, '参数错误');
    }
    const params = {};
    if (username) {
      params.username = { $regex: username };
    }

    const result = await this.ctx.model.Ip.find(params).exec();

    return result;
  }

  async insert(payload) {
    return this.ctx.model.Ip.create(payload);
  }
  async update(payload) {
    const { _id } = payload;
    if (!_id) {
      this.ctx.throw(405, '参数错误');
    }
    const r = await this.ctx.model.Ip.findById(_id);
    if (!r) {
      this.ctx.throw(404, '找不到该资源');
    }
    return this.ctx.model.Ip.findByIdAndUpdate(_id, payload);
  }
  async delete(payload) {
    return this.ctx.model.Ip.remove({ _id: { $in: payload.ids } });
  }
}

module.exports = IpService;

