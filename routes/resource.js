var express = require('express');
var router = express.Router();
var resourceModel = require('../server/model/resource')

/**
 * 资源列表
 */
router.get('/', function (req, res, next) {
    res.render('resource-list');
});

/**
 * 删除资源
 */
router.get('/deleteById', function (req, res, next) {
    let queryData = req.query;
    resourceModel.removeResourceById(queryData.id).then(data => {
        //获取清单内容
        res.redirect('/resource?message=');
    }).catch(err => {
        res.redirect('/resource?message=Error');
    })
});

/**
 * 添加资源
 */
router.post('/add', multipartyMiddleware, function (req, res, next) {
    var inventory = req.body;
    //创建日期
    inventory.createDate = new Date().toLocaleDateString();
    inventory.imageUrl = req.files.image.path;
    //插入数据
    var message = "";
    if (!inventory.name || !inventory.author || !inventory.imageUrl || req.files.image.size === 0) {
        message = "Fail，please check required information"
        res.redirect('/resource?message=' + message);
        return;
    }
    resourceModel.addResource(inventory).then(data => {
        console.log('Success', data);
        //获取清单内容
        res.redirect('/resource');
    }).catch(err => {
        res.redirect('/resource?message=error');
    })

});

module.exports = router;