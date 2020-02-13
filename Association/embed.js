var mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo")

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
})

var Post = mongoose.model("Post", postSchema)

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

var User = mongoose.model("User", userSchema)


var newUser = new User({
    email: "hermione@hogwart.edu",
    name: "H G"
})

newUser.posts.push({
    title: "Potions",
    content: "kidding"
})

// newUser.save(function(err, user){
//     if (err){
//         console.log(err)
//     }else{
//         console.log(user)
//     }
// })

// var newPost = new Post(
//     {
//         title: "Apple",
//         content: "delicious"
//     }
// )

// newPost.save(function(err, post){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(post)
//     }
// })

User.findOne({name: "H G"}, function(err, user){
    if(err){
        console.log(err)
    }else{
        console.log(user)
    }
})
