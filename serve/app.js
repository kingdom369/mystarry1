var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./uitl/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webProductRouter = require('./routes/web/ProductRouter');
// const UserModel = require("./models/UserModel")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


/*
  /adminapi/* - 后台管理系统
  /webapi/* - 企业官网用的
*/
app.use(webNewsRouter)
app.use(webProductRouter)

app.use((req,res,next) =>{
  //如果token有效就next，如果token过期，返回401
    if(req.url==="/adminapi/user/login"){
      next()
      return;
    }
    const token = req.headers["authorization"].split(" ")[1]
    if(token){
      var payload = JWT.verify(token)
      // console.log(payload)
      if(payload){
        // next()
        const newToken = JWT.generate({
          _id:payload._id,
          username:payload.username
        },"1d")
        res.header("Authorization",newToken)
        next()
      }else{
        res.status(401).send({errCode:"-1",errorInfo:"token过期"})
      }
    }
    // next()

})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// app.use(UserModel)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
