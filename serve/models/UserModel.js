const mongoose = require("mongoose")
const Schema = mongoose.Schema
//  user模型 ===》 users集合

const UserType = {
    username:String,  //   用户名
    password:String,  //   密码
    gender:Number,   // 性别 用 0，1，2 来表示
    introduction:String , //介绍 简介
    avatar:String,  // 头像
    role:Number //管理员1，编辑2
}

const UserModel = mongoose.model("user", new Schema(UserType));
module.exports = UserModel
