'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/mockapi/index', controller.base.index);
  router.get('/mockapi/tryConnect', controller.base.tryConnect);

  // 人员IP管理列表
  router.get('/mockapi/ip/list', controller.ip.list);
  router.get('/mockapi/ip/findByUser', controller.ip.findIps);
  router.post('/mockapi/ip/insert', controller.ip.insert);
  router.post('/mockapi/ip/update', controller.ip.update);
  router.post('/mockapi/ip/delete', controller.ip.delete);

  // 系统管理列表
  router.get('/mockapi/system/list', controller.system.list);
  router.get('/mockapi/system/all', controller.system.all);
  router.post('/mockapi/system/insert', controller.system.insert);
  router.post('/mockapi/system/update', controller.system.update);
  router.post('/mockapi/system/delete', controller.system.delete);
  router.get('/mockapi/system/resolve/swagger', controller.system.resolveSwagger);

  // 资源列表
  router.get('/mockapi/resc/list', controller.resc.list);
  router.post('/mockapi/resc/insert', controller.resc.insert);
  router.post('/mockapi/resc/insertMany', controller.resc.insertMany);
  router.post('/mockapi/resc/update', controller.resc.update);
  router.post('/mockapi/resc/delete', controller.resc.delete);
  router.get('/mockapi/resc/switchProxy', controller.resc.switchProxy);

  // 资源Mock数据
  router.get('/mockapi/mockData/list', controller.mockData.list);
  router.post('/mockapi/mockData/insert', controller.mockData.insert);
  router.post('/mockapi/mockData/update', controller.mockData.update);
  router.post('/mockapi/mockData/setPriority', controller.mockData.setPriority);
  router.post('/mockapi/mockData/delete', controller.mockData.delete);


  // *** 实现代理转发拦截
  router.get(/([a-z]+)/, controller.proxy.index);
  router.options(/([a-z]+)/, controller.proxy.index);
  router.post(/([a-z]+)/, controller.proxy.index);
};
