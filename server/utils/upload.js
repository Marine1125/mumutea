import Router from 'koa-router'
import Axios from 'axios'
import multer from 'koa-multer' //加载koa-multer模块

let router = new Router({
  prefix: '/utils'
})

//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    console.log('----' + file + '-----')
    cb(null, 'static/uploads/')
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
//加载配置
var upload = multer({ storage: storage })
//路由
router.post('/uploadFiles', upload.single('file'), async (ctx, next) => {
  let filePath = ctx.req.file.path
  filePath = filePath.replace('static\\', '')
  filePath = filePath.replace('static/', '')
  ctx.body = {
    file: filePath //返回文件路径
  }
})

export default router
