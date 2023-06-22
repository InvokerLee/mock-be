/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660184914087_6021';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.bodyParser = {
    jsonLimit: '15mb',
    formLimit: '1mb',
  };

  config.cors = {
  // orgin: '*',
  // allowMethods: 'GET,POST,PUT,DELETE'
    credentials: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
