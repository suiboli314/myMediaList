var express = require('express');
const works = require("../server/model/works");
const resource = require("../server/model/resource");
var router = express.Router();

/* 我的清单列表 */
router.get('/', function (req, res, next) {
    res.render('index');
});

//获取清单列表
router.get('/getWorks', function (req, res, next) {
    let queryDate = req.query;
    //获取资源列表
    works.findWorks(queryDate).then(worksData => {
        res.send({state: "ok", data: worksData})
    }).catch(err => {
        res.send({state: "err"})
    })
});


//获取资源列表
router.get('/getResources', function (req, res, next) {
    //获取资源列表
    resource.findResource({}).then(data => {
        res.send({state: "ok", data: data})
    }).catch(err => {
        res.send({state: "err"})
    })
});

/* 获取作者相关列表 */
router.get('/authorRelated', function (req, res, next) {
    res.render('author-list');
});

module.exports = router;
