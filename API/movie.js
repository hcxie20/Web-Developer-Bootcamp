var request = require('request');
var options = {
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
    headers:{
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": "7aa67d0addmsh0a69b4e2da1fe7cp140ad3jsne72ae4ca631f"
    }
}
request(options, function (error, response, body) {
    console.log(body)
});
