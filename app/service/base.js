'use strict';
const { tryConnect } = require('../utils/try-connect');

const Service = require('egg').Service;

class BaseService extends Service {
  async tryConnect(payload) {
    const { host, port } = payload;
    if (!host) {
      this.ctx.throw(405, '缺少 host');
    }
    const response = await tryConnect(host, port || 80);
    return response;
  }

}

module.exports = BaseService;

