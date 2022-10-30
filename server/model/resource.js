module.exports = {findResource, addResource, removeResourceById};
let ObjectId = require('mongodb').ObjectId;

//mongo链接
var MongoClient = require('mongodb').MongoClient;
mongo = require('../config/mongo')

//获取链接
const client = new MongoClient(mongo.mongo_url);
const DB_NAME = 'resource'
const COLLECTION_NAME = 'resources'

//增加资源
function addResource(resourceData) {
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).insertOne(resourceData).then(res => {
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

//查询资源

function findResource(data) {
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).find(data).toArray().then(resData => {
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


//删除资源
function removeResourceById(id) {
    return new Promise((resolve, reject) => {
        client.connect().then(db => {
            db.db(DB_NAME).collection(COLLECTION_NAME).deleteOne({'_id': ObjectId(id)}).then(res => {
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
