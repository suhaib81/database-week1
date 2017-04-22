var express = require('express');
var fs = require('fs');
var app = express();
var mysql = require('mysql');
var async      = require('async');
var router = express.Router();
module.exports = router;
var config = JSON.parse(fs.readFileSync("./config-secret.json"))



router.get('/', function (req, res) {




    var pool = mysql.createPool(config);
    var todoName = pool.escape('workout')
    var query1 = "SELECT count(1) as total FROM todos";
    var query2 = "select * from todos where done = 1";
    var query3 = "select * from todos where done <> 1";
    var query4 = "select * from todos order by Due desc";
    var query5 = "select * from todos  order by Due desc LIMIT 1";
    var query6 = "select * from todos where Name like '%databases%'";
    var query7 = `insert into todos (Name) values('${todoName}')`;

    var return_data = {};

    async.parallel([ 

       function(parallel_done) {
           pool.query(query1, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result1 = results;
               parallel_done();
           });
       },

        function(parallel_done) {
           pool.query(query2, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result2 = results;
               parallel_done();
           });
       },

         function(parallel_done) {
           pool.query(query3, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result3 = results;
               parallel_done();
           });
       },

         function(parallel_done) {
           pool.query(query4, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result4 = results;
               parallel_done();
           });
       },

         function(parallel_done) {
           pool.query(query5, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result5 = results;
               parallel_done();
           });
       },

       function(parallel_done) {
           pool.query(query6, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.result6 = results;
               parallel_done();
           });
       }
    ], 
    
    function(err) {
         if (err) console.log(err);
         pool.end();
         //res.send(return_data);
         res.render('pages/index',{data:return_data});
         
         
    });
});


router.get('/delete/:id', function (req, res) {

var connection = mysql.createConnection(config);
connection.connect();
var id = connection.escape(req.params.id);
connection.query('SELECT FROM todos where id='+id, function (error, results, fields) {
    console.log(results);
});
connection.end();
res.send('deleted'+id)

});

router.get('/update/:id', function (req, res) {
var connection = mysql.createConnection(config);
connection.connect();
var id = connection.escape(req.params.id);
var name = connection.escape(req.params.name);
connection.query('update todos set Name = '+name+' where id='+id, function (error, results, fields) {
    console.log(results);
});
connection.end();
res.send('deleted'+id)

});


       
