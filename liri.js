require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];

var nodeArgs = process.argv;
var movieName = "";

///////////////////////////////////////////////////////////////////////

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}

if (userInput === "movie-this", movieName) {

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});

} else if (userInput === "movie-this") {
  
  var optionTwo = "Mr. Nobody";

  var movie = "http://www.omdbapi.com/?t=" + optionTwo + "&y=&plot=short&apikey=trilogy";

  request(movie, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
});
}

///////////////////////////////////////////////////////////////////////

if (userInput === "my-tweets") {

var username = {screen_name: "jcrcoding"};

client.get('statuses/user_timeline', username, function (error, tweets, response) {
  if(error) throw error; 
  else {
      for (var i = 0; i < tweets.length; i++) {
          console.log("Tweet: " + tweets[i].text);
          console.log("Created at: " + tweets[i].created_at);
      }
}
});
}

///////////////////////////////////////////////////////////////////////



