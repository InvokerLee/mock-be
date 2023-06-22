'use strict';

const Service = require('egg').Service;

const parseJson = str => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
};

class ProxyService extends Service {
  async index() {
    const { request } = this.ctx;
    const { headers, url, method, body } = request;
    // const orgin = request.origin;
    const host = headers.host;
    // const scheme = headers['x-scheme'] || 'http';
    const contentType = headers['content-type'];
    // const port = headers['x-forwarded-port'];

    const path = url.split('?')[0];
    const [ servername ] = host.split(':');

    // 1. 匹配 path 和 host
    const sys = await this.ctx.model.System.findOne({ host: servername }).exec();
    const resc = await this.ctx.model.Resc.findOne({ rescPath: path, system: sys && sys._id }).populate({
      path: 'system',
      // match: { host: servername },
      select: 'host port ip scheme',
    })
      .exec();
    if (!resc || !resc.system) {
      return this.ctx.throw(404, `匹配不到相关资源，主机名：${servername}, 路径 ${path}`);
    }

    const { isProxy, _id, system } = resc;
    // 2. 不需要代理，直接查找返回mockData
    if (!isProxy) {
      const mockDatas = await this.ctx.model.MockData.find({ rescId: _id }).sort({ createdAt: -1 })
        .exec();
      if (!mockDatas || !mockDatas.length) return '未设置mock数据';
      // 2-1. 是否有优先数据
      const firstItem = mockDatas.find(v => v.isPriority);
      if (firstItem) {
        return parseJson(firstItem.jsonData);
      }

      // 2-2. 否则，返回最后创建的数据
      return parseJson(mockDatas[0].jsonData);
    }

    // 3. 直接请求真实IP的接口
    if (!system) {
      return this.ctx.throw(404, '匹配不到系统，无法代理');
    }
    const h = {};
    if (contentType) {
      h['content-type'] = contentType;
    }
    const proxyData = await this.goServer(`${system.scheme}://${system.ip}${system.port ? ':' + system.port : ''}${url}`, {
      data: body,
      method,
      headers: h,
    });
    return proxyData;
  }
  async goServer(url, options) {
    const res = await this.ctx.doCurl(url, options);
    return res ? res.data : null;
  }
}

module.exports = ProxyService;

