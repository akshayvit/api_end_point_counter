var http=require('http');
var express=require('express');
const { response } = require('express');
var app=express();
//var { buildSchema } = require('graphql');
var url="mongodb://localhost:27017";
const Pool=require('pg').Pool;
const pl=new Pool({
    user: 'mac',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port:5432,
});

app.get('/create_data',function(req,res) {
    res.write("<script>var p=prompt('Admin Key?');if(p!='admin') {alert('Not allowed');window.close();}</script>");
    
    pl.query("insert into records values($1,$2,$3)",[parseInt(req.query.id),req.query.name,parseInt(req.query.count)],(err,result) => {
        if(err) throw err;
        res.end("Succesfully inserted data for "+req.query.id);
    });
});
app.get('/get_data',function(req,res){
    var dict={};
    pl.query("Select name,roll_no from records where id=$1",[parseInt(req.query.id)],(error,result) => {
        if(error) {console.log((req.query.id).toString());throw error;}
         dict={
        name:result.rows[0].name,
        count:result.rows[0].roll_no


    };
    res.end(JSON.stringify(dict));
    console.log(result.rows[0].name);
    });

    
   // res.write();
});

var server=app.listen(8000,function(req,res){
    var host=server.address().host;
    var port=server.address().port;
    console.log(host,port);
});