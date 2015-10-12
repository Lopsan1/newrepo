var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var store = require('./routes/store');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var validator = require('validator');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.Router());
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh'}));

function databaseInstance(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    password : 'n0m3l0',
    user     : 'root',
    database : 'denuncias'
  });
  return connection;
}
var login = function(req,res){
  var usuario = req.body.usu;
  var password = req.body.pass;
  var database = new databaseInstance();
  var ses = req.session;
  var loginqwery;
  loginqwery = 'SELECT * FROM admin WHERE usr= "'+usuario+'" and pass = "'+password+'";';
  database.query(loginqwery,function(error, result, row){
    if(!error){
      if(result[0]){
        req.session.datos = result;
        req.session.is_logged_in = true;
        res.redirect('/admin');
      }
      else{
        ses.user = result;
        res.redirect('/');
      }
    }
    else{
      res.redirect('error');
    }
  });
};
var adm = function(req, res){
  console.log("la wea" + req.body.usu);
  var usi = req.body.usu;
  var pas = req.body.pass;
  var name= req.body.nombre;
  var level = "1";
  var database = new databaseInstance();
  var ses = req.session;
  var loginqwery;
  loginqwery = 'INSERT INTO admin values('+ "'" + usi + "'" + ',' + "'" + pas + "'" + ',' + "'" + name + "'" + ',' + "'" + level + "'" + ');';
  console.log(loginqwery);
  database.query(loginqwery);
  res.redirect('/index');
};

var login = function(req , res){
  var usi = req.body.usu;
  var pas = req.body.pass;
  var name= req.body.nombre;
  var level = "1";
  var database = new databaseInstance();
  var ses = req.session;
  var loginqwery;
  loginqwery = 'INSERT INTO admin values('+ "'" + usi + "'" + ',' + "'" + pas + "'" + ',' + "'" + name + "'" + ',' + "'" + level + "'" + ');';
  console.log(loginqwery);
  database.query(loginqwery);
  res.redirect('/index');}

var logout = function(req,res){
  var ses = req.session;
  ses.session.is_logged_in = false;
  res.redirect('/index');
}

var regisden = function(req,res){
  var database =  new databaseInstance();
  var loginqwery;
  var denunci = req.body.denuncia;
  var matric;
  if (req.body.matri == "") {
     matric = "0";
  }
  else{
    matric = req.body.matri;
  }
  var denunciado = req.body.denudo;
  var violen = req.body.violin;
  var titulo = req.body.titul;
  var esta = "recibido";
  var tim = "CURDATE()";
  var solucio = "indefinida";
  loginqwery = 'INSERT INTO denu (fecha,matricula,denuncia,estatus,solucion,denunciado) values('+ tim  + ',' + "'" + matric + "'" + ',' + "'" + denunci + "'" + ',' + "'" + esta + "'" + ',' + "'" + solucio + "'" + ',' + "'" + denunciado+ "'" + ');';
  console.log(loginqwery);
  database.query(loginqwery);
  res.redirect('/contacto');
}

function login(req,res,next){
  var ses= req.session;
  if(ses.is_logged_in) {
    next();
  }
  else{
    res.redirect('/index');
  }
};
var wea = function(req,res){
  var database = new databaseInstance();
  var queri;
  var boleano = true;
  queri = 'SELECT * FROM denu;';
  console.log(queri);
  database.query(queri,function(error, result, row){
    if(!error) {
          if(result[0]){

           req.session.datos=result;
           pasa = boleano;
           res.redirect('/contacto');
           
          }
          else{
            ses.user = result;
            boleano=false;
            pasa=boleano;
            res.redirect('/index');
          }
        
      }else{
            boleano=false;
            pasa=boleano;
            res.redirect('/index');
          }
  });
};

//weas de get
app.get('/', store.index)
app.get('/index',store.index);
app.get('/registro',store.registro);
app.get('/denunciar',store.denun);
app.get('/denuncom',store.denunc);
app.get('/contacto',store.contac);
//weas de post
app.post('/login',login);
app.post('/regisdenuncia',regisden);
app.post('/wea',wea);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.Router());
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh'}));
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;