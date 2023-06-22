'use strict';
const Service = require('egg').Service;

const formatResc = (url, options) => {
  const types = [ 'get', 'post', 'delete', 'put' ];
  const r = { rescPath: url };
  Object.keys(options).forEach(key => {
    if (types.includes(key)) {
      r.type = key.toLocaleUpperCase();
      r.rescName = options[key].summary;
    }
  });
  // rescPath: '', rescName: '', type: '',
  return r;
};

class SystemService extends Service {
  async list(payload) {
    const { currentPage, pageSize, systemName, host } = payload;
    if (!currentPage || !pageSize) {
      this.ctx.throw(405, '参数错误');
    }
    const params = {};
    if (systemName) {
      params.systemName = { $regex: systemName };
    }
    if (host) {
      params.host = { $regex: host };
    }

    const skip = (Number(currentPage) - 1) * Number(pageSize);
    const result = await Promise.all([
      this.ctx.model.System.countDocuments(params).exec(),
      this.ctx.model.System.find(params).sort({ createdAt: -1 })
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
  async all() {
    const result = await this.ctx.model.System.find();
    return result;
  }

  async insert(payload) {
    const r = await this.ctx.model.System.findOne({ host: payload.host }).exec();
    if (r) {
      this.ctx.throw(405, '已存在相同的系统');
    }
    return this.ctx.model.System.create(payload);
  }
  async update(payload) {
    const { _id, host } = payload;
    if (!_id) {
      this.ctx.throw(405, '参数错误');
    }
    const repeat = await this.ctx.model.System.findOne({ host, _id: { $ne: _id } }).exec();
    if (repeat) {
      this.ctx.throw(405, '已存在相同的系统');
    }
    return this.ctx.model.System.findByIdAndUpdate(_id, payload);
  }
  async delete(payload) {
    return this.ctx.model.System.remove({ _id: { $in: payload.ids } });
  }
  async resolveSwagger(payload) {
    const { _id } = payload;
    if (!_id) {
      this.ctx.throw(405, '参数错误');
    }
    const sys = await this.ctx.model.System.findOne({ _id }).exec();
    const { scheme, ip, port, swaggerApi } = sys;
    if (!swaggerApi || !ip) {
      this.ctx.throw(405, 'Ip地址或者swaggerApi不存在');
    }
    const url = `${scheme}://${ip}${port ? ':' + port : ''}${swaggerApi}`;
    const res = await this.ctx.service.proxy.goServer(url, { method: 'GET' });
    if (!res || !res.paths) {
      return;
    }
    const list = [];
    Object.entries(res.paths).forEach(([ path, opts ]) => {
      const resc = formatResc(path, opts);
      list.push({
        ...resc,
        systemId: _id,
      });
    });
    return list;
  }
}

module.exports = SystemService;

