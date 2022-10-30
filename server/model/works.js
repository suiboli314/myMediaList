//导出
module.exports = {findWorks, addWorks, updateWorks};

let ObjectId = require('mongodb').ObjectId;

//mongo链接
var MongoClient = require('mongodb').MongoClient;
mongo = require('../config/mongo')

//获取链接
const client = new MongoClient(mongo.mongo_url);
const DB_NAME = 'resource'
const COLLECTION_NAME = 'works'

//添加清单
function addWorks(data) {
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).insertOne(data).then(resData => {
                resolve(true)
            }).catch(err => {
                    console.error(err)
                    reject(false)
                }
            )
        }).catch(err => {
            console.error(err)
            reject(false)
        })
    })
}

//查询清单列表
function findWorks(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).find(data).sort({'orderNo': 1}).toArray().then(resData => {
                resolve(resData)
            }).catch(err => {
                    console.error(err)
                    reject(false)
                }
            )
        }).catch(err => {
            console.error(err)
            reject(false)
        })
    })
}

//修改清单列表
function updateWorks(id, data) {
    console.debug('id=', id)
    console.debug('data=', data)
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).updateOne({'_id': ObjectId(id)}, {$set: data}).then(resData => {
                resolve(resData)
            }).catch(err => {
                    console.error(err)
                    reject(false)
                }
            )
        }).catch(err => {
            console.error(err)
            reject(false)
        })
    })
}
