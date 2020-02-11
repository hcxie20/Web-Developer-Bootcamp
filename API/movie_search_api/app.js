var express = require("express");
var app = express()
var request = require("request")
app.set("view engine", "ejs")
app.get("/", function(req, res){
    res.render("search")
})
app.get("/results", function(req, res){
    var search = req.query.search
    request("http://omdbapi.com/?s="+search+"&apikey=thewdb", function(error, response, request){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(response.body)
            res.render("results", {data:data})
        }
    })
})

app.listen(3000, function(){
    console.log("Server listen on 3000")
})