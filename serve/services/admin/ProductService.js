const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({
            title, introduction, detail, cover, editTime
        })
    },
    updataList: async ({ title, introduction, detail, _id,
        cover,
        editTime }) => {
        if (cover) {
            return ProductModel.updateOne({
                _id
            }, {
                title, introduction, detail,
                cover,
                editTime
            })
        } else {
            return ProductModel.updateOne({
                _id
            }, {
                title, introduction, detail,
                editTime
            })
        } //要对图片是否更改进行判断，如果没修改传输的值为空，要特判
    },
    getList: async ({ _id }) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find({})
    },

  
    delList: async (_id) => {
        return ProductModel.deleteOne({ _id })
    }
}

module.exports = ProductService