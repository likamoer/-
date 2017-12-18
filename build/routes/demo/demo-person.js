'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../commons/utils');

var _index = require('../../model/index');

exports.default = {
  '/': [{
    /**
     * @api {get} /api/demo-person Get Person
     * @apiName GetPerson
     * @apiGroup PersonDemo
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'get',
    callback: function callback(req, res, next) {
      _index.Person.findAll({
        attributes: ['id', 'name'],
        where: {
          // id: 1
        }
      }).then(function (result) {
        res.json((0, _utils.resJsonMaker)({ result: result }, 'Get person'));
      });
    }
  }, {
    /**
     * @api {post} /api/demo-person Add Person
     * @apiName AddPerson
     * @apiGroup PersonDemo
     *
     * @apiParam {String} name 姓名
     * @apiParam {String} sex 性别
     * @apiParam {Text} description 描述
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'post',
    callback: function callback(req, res, next) {
      _index.Person.create(req.body).then(function (result) {
        res.json((0, _utils.resJsonMaker)({ result: result }, 'Add a person'));
      });
    }
  }, {
    method: 'put', // update
    callback: function callback(req, res, next) {}
  }, {
    method: 'delete', // delete
    callback: function callback(req, res, next) {}
  }]
};