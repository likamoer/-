'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../commons/utils');

exports.default = {
  '/:time/': [{
    /**
     * @api {get} /api/demo-url/:time Get Demo
     * @apiName GetDemo
     * @apiGroup URL-Demo
     *
     * @apiParam {Number} time 获取请求发起时间
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'get',
    callback: function callback(req, res, next) {
      var time = req.params.time;
      res.json((0, _utils.resJsonMaker)({
        time: time
      }, 'Get Test'));
    }
  }, {
    /**
     * @api {post} /api/demo-url/:time Post Demo
     * @apiName PostDemo
     * @apiGroup URL-Demo
     *
     * @apiParam {Number} time 获取请求发起时间
     * @apiParam {String} name 名称
     * @apiParam {String} test 测试参数
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'post',
    callback: function callback(req, res, next) {
      var time = req.params.time; // 获取url参数
      var name = req.body.name; // 获取post参数
      var test = req.query.test; // 获取URL参数(eq: ?a=b...)
      res.json((0, _utils.resJsonMaker)({
        time: time,
        name: name,
        test: test
      }, 'Post Test'));
    }
  }]
}; /**
    * Restful, ApiDoc Demo
    * xufengchao
    * 2016.09.20
    */