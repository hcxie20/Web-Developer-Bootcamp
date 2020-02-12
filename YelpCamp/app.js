var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp")

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

// SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})
var Campgound = mongoose.model("Campground", campgroundSchema)

// Campgound.create(
//     {name: "Salmon creek", image: "https://www.campsitephotos.com/photo/camp/131240/feature_Salmon_Creek-f3.jpg", description: "Non ipsum enim laborum consequat voluptate tempor occaecat dolore tempor esse duis sunt. Quis nulla qui ex eiusmod officia exercitation elit nisi commodo nulla do. Et duis fugiat duis anim quis magna culpa tempor do exercitation id sint cupidatat enim. Laborum occaecat excepteur ea et ad nulla amet ea dolore enim aliquip pariatur. Eiusmod eu veniam excepteur laborum."}, function(err, camp){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("New camp loaded")
//         console.log(camp)
//     }
// })

// Campgound.create(
//     {name: "Bluff View Cleanwater Lake", image: "https://www.campsitephotos.com/photo/camp/97821/Sibley_Lake_004.jpg", description:"Enim id aliqua elit laborum ullamco esse Lorem duis. Reprehenderit id minim ad duis excepteur consequat do tempor ipsum laboris ad veniam ipsum officia. Dolore excepteur et sit et ut voluptate officia occaecat occaecat sit. Adipisicing irure labore aliquip ea officia. Esse ut enim occaecat veniam duis amet proident mollit. Eiusmod consequat sint aliquip aliquip aliquip ut minim exercitation irure."}, function(err, camp){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("New camp loaded")
//         console.log(camp)
//     }
// })

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    Campgound.find({}, function(err, campgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("index", {campgrounds, campgrounds})
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("new_camp")
})

app.get("/campgrounds/:id", function(req, res){
    Campgound.findById(req.params.id, function(err, rst){
        if(err){
            console.log(err)
        }else{
            res.render("show", {campground: rst})
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

app.listen(3000, function(){
    console.log("YelpCamp Server Started")
})