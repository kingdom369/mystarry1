var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');
var ProductRouter = express.Router();

//图片上传模块multer
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

/* GET home page. */
ProductRouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)


ProductRouter.get("/adminapi/product/list",ProductController.getList)

ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)

ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)

ProductRouter.post("/adminapi/product/list",upload.single('file'),ProductController.updataList)




module.exports = ProductRouter;
