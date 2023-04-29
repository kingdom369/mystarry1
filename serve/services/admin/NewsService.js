const NewsModel = require("../../models/NewsModel")
const NewsService = {
    add:async ({ title, content, category, isPublish,cover,editTime }) =>{
        // console.log("数据库的增加")

        return NewsModel.create({
            title, content, category, isPublish,cover,editTime
        })
    },
    updataList:async ({category, isPublish, title, content,_id,cover,editTime}) =>{
        if (cover) {
            return NewsModel.updateOne({
                _id
            }, {
                category, isPublish, title, content,editTime,cover
            })
        } else {
            return NewsModel.updateOne({
                _id
            }, {
                category, isPublish, title, content,editTime
            })
        } //要对图片是否更改进行判断，如果没修改传输的值为空，要特判
    },
    getList: async({_id}) => {
        return _id? NewsModel.find({_id}) : NewsModel.find({})
    },
   
    publish: async({_id,isPublish,editTime}) => {
        return NewsModel.updateOne({_id},{
            isPublish,
            editTime
        })
    },
    delList: async (_id) => {
        return NewsModel.deleteOne({ _id })
    }
}

module.exports = NewsService