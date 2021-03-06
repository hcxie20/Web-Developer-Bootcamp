var express = require("express")
    app = express()
    bodyParser = require("body-parser")
    mongoose = require("mongoose")
    methodOverride = require("method-override")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/restful_blog_app")

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date, default: Date.now
    }
})

var Blog = mongoose.model("Blog", blogSchema)

app.get("/", function(req, res){
    res.redirect("blogs")
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
            res.send("Error")
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})

app.get("/blogs/new", function(req, res){
    res.render("new")
})

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err)
        } else {
            res.redirect("/blogs")
        }
    })
})

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("show", {blog:blog})
        }
    })
})

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err)
        }else{
            res.render("edit", {blog: blog})
        }
    })
})

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/"+req.params.id)
        }
    })
})

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    })
})

app.listen(3000, function(){
    console.log("Server")
})