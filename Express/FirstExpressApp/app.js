console.log("first app")

var express = require("express");
var app = express();

app.get("/", function(request, response){
    response.send("Hi")
})

app.get("/r/:name", function(request, response){
    console.log(request.params)
    var name_tag = request.params.name // the same one as :name
    response.send("This is a name tag: " + name_tag)
})

app.get("/bye", function(request, response){
    response.send("Bye")
})


app.listen(3000, function(){
    console.log("server started")
})
