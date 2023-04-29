const mongoose = require("mongoose")
const Schema = mongoose.Schema
//  news模型 ===》 news集合

const NewsType = {
    title:String,  
    content:String,  
    category:Number,   // 1是最新动态  2是典型案例  3是通知公告
    cover:String,  // 头像
    isPublish:Number,  // 0表示未发布 1表示已经发布
    editTime:Date //时间

}

const NewsModel = mongoose.model("news", new Schema(NewsType));
module.exports = NewsModel