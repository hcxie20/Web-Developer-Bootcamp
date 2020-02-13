var express = require("express")
    mongoose = require("mongoose")
    passport = require("passport")
    bodyParser = require("body-parser")
    LocalStrategy = require("passport-local")
    passportLocalMongoose = require("passport-local-mongoose")
    User = require("./models/user")

var app = express()
app.use(require("express-session")({
    secret: "A secret",
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/auth")

app.get("/", function(req, res){
    res.render("home")
})

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret")
})

// Auth
app.get("/register", function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.send("error")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret")
        })
    })
})

app.get("/login", function(req, res){
    res.render("login"); 
 });

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout()
    res.redirect("/")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.render("login")
    }
}

app.listen(3000, function(){
    console.log("server")
})