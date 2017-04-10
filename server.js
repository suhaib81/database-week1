// require our dependencies
var express=require('express');
var expressLayouts = require('express-ejs-layouts')
var port=3000;
var app = express();
var router = require('./app/routes');

//use ejs and express layouts
app.set('view engine','ejs')
app.use(expressLayouts);

//route our app
app.use('/',router);
app.use(express.static(__dirname+'/public'));

//Start the Server
app.listen(port,()=>{
    console.log('Magic happens on port ' + port);
})