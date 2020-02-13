var express = require("express")
    app = express()
    bodyParser = require("body-parser")
    mongoose = require("mongoose")
    Campgound = require("./models/campground")
    seedDB = require("./seed")

seedDB()
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp")

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))

// SCHEMA


app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    Campgound.find({}, function(err, campgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/index", {campgrounds, campgrounds})
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", function(req, res){
    Campgound.findById(req.params.id).populate("comments").exec(function(err, rst){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show", {campground: rst})
        }
    })
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.desc
    var new_camp = {name: name, image: image, description}
    Campgound.create(new_camp, function(err, news){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds")
        }
    })
})

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: camp})
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/"+campground._id)
                }
            })
        }
    })
})

app.listen(3000, function(){
    console.log("YelpCamp Server Started")
})