/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.mongoose = {
    url: 'mongodb://develop:aa@192.168.11.109:27017/ecp_member',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    },
  };

  exports.cluster = {
    listen: {
      port: 3009,
      hostname: '0.0.0.0',
    },
  };

  return {
    ...config,
  };
};
