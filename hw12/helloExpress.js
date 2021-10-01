var express=require('express');
var exp = express();

exp.get('/',function(req,res) {
    res.send("Hello World");
});
var server = exp.listen(8080, function() {}});
