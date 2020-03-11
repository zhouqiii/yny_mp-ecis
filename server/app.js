var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static('../dist'));
app.get('/*', function(req,res){
	fs.readFile('../dist/index.html',function(err,data){
		if(err){
			return console.error(err);
		}
		res.send(data.toString());
	})
	
})


var server = app.listen(8081, function(){
	console.log("成功！")
})