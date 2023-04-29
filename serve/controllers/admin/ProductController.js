const ProductService = require("../../services/admin/ProductService")


const ProductController = {

    add: async (req, res) => {
        // console.log(req.body,req.file)
        const { title, introduction, detail } = req.body
        //调用service 模块更新 存入数据库


        const cover = req.file ? `/productuploads/${req.file.filename}` : ""


        await ProductService.add({ title, introduction, detail, cover,editTime:new Date() })
        res.send({
            ActionType: "OK",
        })
    }, 
    
    updataList: async (req, res) => {

        const cover = req.file ? `/productuploads/${req.file.filename}` : ""


        const { title, introduction, detail,_id } = req.body

        await ProductService.updataList({
            title, introduction, detail,_id,
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "ok"
        })
    },

    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    delList: async (req, res) => {
        await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType: "ok",
        })
    },
}


module.exports = ProductController