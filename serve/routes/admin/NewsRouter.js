var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();

//图片上传模块multer
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

/* GET home page. */
NewsRouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single('file'),NewsController.updataList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
// NewsRouter.put("/adminapi/news/delete",NewsController.delete)



module.exports = NewsRouter;
