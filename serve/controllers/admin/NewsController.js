const NewsService = require("../../services/admin/NewsService")
const NewsController = {
    add: async (req, res) => {
        //调用service进行添加
        // console.log(req.file, req.body)

        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""


        const { category, isPublish, title, content } = req.body

        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "ok"
        })
    },
    updataList: async (req, res) => {

        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""


        const { category, isPublish, title, content,_id } = req.body

        await NewsService.updataList({
            _id,
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            ActionType: "ok"
        })
    },

    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    publish: async (req, res) => {
        await NewsService.publish({
            ...req.body,
            editTime: new Date()
        })
        res.send({
            ActionType: "ok",
        })
    },
    delList: async (req, res) => {
        await NewsService.delList({ _id: req.params.id })
        res.send({
            ActionType: "ok",
        })
    },
}

module.exports = NewsController