exports.logine = function(req,res){
	res.render('logine',{	title: 'login',
							todo: req.session.datos
	});
};
exports.index = function(req,res){
	res.render('index',{ title:'Home'
	});
};
exports.registro = function(req,res){
	res.render('registro',{ title: 'registro'
	});
};
exports.denun = function(req,res){
	res.render('denun',{ title: 'denunciar'
	});
};
exports.denunc = function(req, res){
	res.render('denunc',{ title: 'denunciaComppleta'
	});
};
exports.contac = function(req, res){
	res.render('contac',{ title: 'contacto',
			consulta:req.session.datos
	});
};
var holis = function(param){
  
  var moment = param;
  var output = "\"[";
  console.log(moment);
  for(var i = 0; i < moment.length; i++){
    output += "{'denuncia': '" + moment[i].denuncia + "',";
    output += "'denunciado': '" + moment[i].denunciado + "',";
    output += "'estatus': '" + moment[i].estatus + "',";
    output += "'fecha': '" + moment[i].fecha + "'}";
    output += (i != moment.length - 1) ? "," : "";
   }
  output += "]\"";
  console.log(output);
  //output = output.replace(/\'/g, "\"");
  return output;
}