var express = require('express')
var Router = express.Router
var router = Router()
var path = require('path')
var BASE_PATH = path.resolve(__dirname, '../mockup/')
function mockMiddleware () {
  return function (req, res, next) {
    var pathName = req.path
    //判断是否是Api请求
    if (!pathName || !/^\/?api/.test(pathName)) {
      next()
      return
    }
    var basePath = pathName.replace(/\//g, '_').replace(/^_/, '')
    var data = require(path.join(BASE_PATH, basePath + '.json'))
    setTimeout(function () {
      res.send(data)
    }, 300)
  }
}
var middleWare = mockMiddleware()
//拦截internet各类请求
router.get('*', middleWare)
router.post('*', middleWare)
module.exports = router

