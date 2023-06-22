exports.doCurl = async function(url, options) {
  // this === ctx
  const defaultOptions = {
    timeout: 20000,
    dataType: 'json',
    method: 'GET',
    strictSSL: false, // solve 'unable to verify the first certificate' problem
    rejectUnauthorized: false,
    headers: {
      'x-token': this.req.headers['x-token'],
      'x-cas-account-code': this.req.headers['x-cas-account-code'],
      'x-customer-code': this.req.headers['x-customer-code'],
      'user-agent': this.req.headers['user-agent'],
      'x-req-url': this.req.url,
      origin: this.req.headers.origin,
      cookie: this.req.headers.cookie,
      referer: this.req.headers.referer,
      // 'Content-Type': options.contentType,
    },
  };

  if (options && options.headers) {
    options.headers = Object.assign(defaultOptions.headers, options.headers);
  }

  Object.assign(defaultOptions, options);
  try {
    const res = await this.curl(url, defaultOptions);
    return res || null;
  } catch (e) {
    this.logger.error(`接口：${url} catch到的错误信息：${e}`);
    this.throw(500, e.message);
  }
};
