var express = require("express")
    app = express()
    bodyParser = require("body-parser")
    mongoose = require("mongoose")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
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

// Blog.create({
//     title: "Dog",
//     image: "https://www.udemy.com/staticx/udemy/images/v6/logo-coral-light.svg",
//     body: "Dolor id do labore ullamco ipsum. Culpa magna fugiat Lorem veniam aute culpa laboris cillum. Eiusmod irure cupidatat laboris culpa ex consectetur. Proident culpa dolore magna non fugiat aliqua elit. Labore minim non officia quis pariatur elit est elit excepteur."
// })

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

app.listen(3000, function(){
    console.log("Server")
})