var express = require("express")
var app = express()

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("home")
})

app.get("/test/:num", function(req, res){
    var agm = req.params.num
    res.render("test", {varNum: agm})
})

app.get("/posts", function(req, res){
    var posts = [
        {title: "post 1", author: "J"},
        {title: "bunny", author: "k"},
    ]
    res.render("posts", {posts:posts})
})

app.listen(3000, function(){
    console.log("Server listening on 3000")
})