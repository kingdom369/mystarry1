const ProductService = require("../../services/web/ProductService")
const ProductController = {
  

    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "ok",
            data: result
        })
    },

}

module.exports = ProductController