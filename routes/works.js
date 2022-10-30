var express = require('express');
var router = express.Router();
var workModel = require('../server/model/works')
var multipart = require('connect-multiparty');
const fs = require('fs')
const path = require('path')
multipartyMiddleware = multipart({uploadDir: '/Users/sylonyd/Desktop/upload'});


/**
 * 添加清单
 */
router.post('/add', multipartyMiddleware, function (req, res, next) {
    var inventory = req.body;
    //创建日期
    inventory.createDate = new Date().toLocaleDateString();
    //插入数据
    var message = "";
    if (!inventory.name || !inventory.author || !inventory.introduce || !inventory.imageUrl) {
        message = "Fail，please check required information"
        res.redirect('/?message=' + message);
        return;
    }
    workModel.addWorks(inventory).then((data) => {
        console.log('Success', data);
    }).catch((err) => {
        message = "Fail";
        console.log('Fail', err);
    });
    //获取清单内容
    res.redirect('/?message=' + message);
});

/**
 * 排序
 */
router.post('/sort', (req, res) => {
    var data = req.body;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        workModel.updateWorks(item, {"orderNo": i}).then(data => {
            console.debug("Sorted Success-", item)
        }).catch(err => {
            console.debug("Sorted err-", item, err)
        })
    }
    res.send({state: "ok"})
})

/**
 * 获取图片
 */
router.get('/', (req, res, next) => {
    var queryData = req.query;
    const filePath = path.resolve(__dirname, queryData.url);
    // 给客户端返回一个文件流
    //格式必须为 binary，否则会出错
    // 创建文件可读流
    const cs = fs.createReadStream(filePath);
    cs.on("data", chunk => {
        res.write(chunk);
    })
    cs.on("end", () => {
        res.status(200);
        res.end();
    })
})

module.exports = router;