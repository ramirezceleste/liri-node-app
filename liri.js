require("dotenv").config();
var fs = require("fs");
var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];


var nodeArgs = process.argv;
var movieName = "";


if (userInput === "my-tweets") {

  var username = {screen_name: "jcrcoding"};
  
  client.get('statuses/user_timeline', username, function (error, tweets, response) {
    if(error) throw error; 
    else {
        for (var i = 0; i < tweets.length; i++) {
            console.log("Tweet: " + tweets[i].text);
            console.log("Created at: " + tweets[i].created_at);
            console.log("----------------------------------------------");
            console.log("");
        }
  }
  });
  }

  if (userInput === "movie-this") {

    inquirer.prompt([
      {
          type: "input",
          message: "What movie do you want to search for?",
          name: "movie"
      }
    ]).then(function (inquirerResponse) {
      var movieName = "";
      if (inquirerResponse.movie === "") {
        console.log("No movie given. Check out the one below!");
          movieName = "Mr. Nobody";
      }
      else {
          movieName = inquirerResponse.movie;
      }
  
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
  });
  }


if (userInput === "spotify-this-song") {

  inquirer.prompt([
    {
        type: "input",
        message: "What song do you want to search for?",
        name: "song"
    }
  ]).then(function (inquirerResponse) {
    var songName = "";
    if (inquirerResponse.song === "") {
        songName = "The Sign Ace of Base";
    }
    else {
        songName = inquirerResponse.song;
    }

  spotify.search({ type: 'track', query: songName}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    for (var x = 0; x < 1; x++) {
      var artistsArr = [];
      for (var i = 0; i < data.tracks.items[x].artists.length; i++) {
          artist = data.tracks.items[x].artists[i].name
          artistsArr.push(artist);
      }
      
      console.log("Artist(s): " + artistsArr.join(", "));
      console.log("Song Name: " + data.tracks.items[x].name);
      console.log("Check it out here: " + data.tracks.items[x].preview_url);
      console.log("Album: " + data.tracks.items[x].album.name)
      
  }

});
})
}

if (userInput === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
   
    var dataArr = data.split(",");
  
    if (dataArr[0] === "spotify-this-song") {
  
      var songSearch = dataArr[1];
  
      spotify.search({ type: 'track', query: songSearch}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    
        for (var x = 0; x < 1; x++) {
          var artistsArr = [];
          for (var i = 0; i < data.tracks.items[x].artists.length; i++) {
              artist = data.tracks.items[x].artists[i].name
              artistsArr.push(artist);
          }
          
          console.log("Artist(s): " + artistsArr.join(", "));
          console.log("Song Name: " + data.tracks.items[x].name);
          console.log("Check it out here: " + data.tracks.items[x].preview_url);
          console.log("Album: " + data.tracks.items[x].album.name)
          
      }
    
    });
    }
    
  });
  
  }


///////////////////////////////////////////////////////////////////////

if (userInput !== "my-tweets" && userInput !== "do-what-it-says"&&userInput !== "spotify-this-song"&& userInput !== "movie-this") {

inquirer 
.prompt([
    {
        type: 'list',
        message: 'Pick a command to try',
        choices: ["movie-this", "spotify-this-song", "do-what-it-says", "my-tweets"],
        name: 'command'
    }
])

.then(function(inquirerResponse) {

if (inquirerResponse.command === "movie-this") {

  inquirer.prompt([
    {
        type: "input",
        message: "What movie do you want to search for?",
        name: "movie"
    }
  ]).then(function (inquirerResponse) {
    var movieName = "";
    if (inquirerResponse.movie === "") {
      console.log("No movie given. Check out the one below!");
        movieName = "Mr. Nobody";
    }
    else {
        movieName = inquirerResponse.movie;
    }

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
});
} 

///////////////////////////////////////////////////////////////////////

if (inquirerResponse.command === "my-tweets") {

var username = {screen_name: "jcrcoding"};

client.get('statuses/user_timeline', username, function (error, tweets, response) {
  if(error) throw error; 
  else {
      for (var i = 0; i < tweets.length; i++) {
          console.log("Tweet: " + tweets[i].text);
          console.log("Created at: " + tweets[i].created_at);
          console.log("----------------------------------------------");
          console.log("");
      }
}
});
}

///////////////////////////////////////////////////////////////////////

if (inquirerResponse.command === "spotify-this-song") {

  inquirer.prompt([
    {
        type: "input",
        message: "What song do you want to search for?",
        name: "song"
    }
  ]).then(function (inquirerResponse) {
    var songName = "";
    if (inquirerResponse.song === "") {
        songName = "The Sign Ace of Base";
    }
    else {
        songName = inquirerResponse.song;
    }

  spotify.search({ type: 'track', query: songName}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    for (var x = 0; x < 1; x++) {
      var artistsArr = [];
      for (var i = 0; i < data.tracks.items[x].artists.length; i++) {
          artist = data.tracks.items[x].artists[i].name
          artistsArr.push(artist);
      }
      
      console.log("Artist(s): " + artistsArr.join(", "));
      console.log("Song Name: " + data.tracks.items[x].name);
      console.log("Check it out here: " + data.tracks.items[x].preview_url);
      console.log("Album: " + data.tracks.items[x].album.name)
      
  }

});
})
}

///////////////////////////////////////////////////////////////////////

if (inquirerResponse.command === "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
 
  var dataArr = data.split(",");

  if (dataArr[0] === "spotify-this-song") {

    var songSearch = dataArr[1];

    spotify.search({ type: 'track', query: songSearch}, function (err, data) {
      if (err) {
          return console.log('Error occurred: ' + err);
      }
  
      for (var x = 0; x < 1; x++) {
        var artistsArr = [];
        for (var i = 0; i < data.tracks.items[x].artists.length; i++) {
            artist = data.tracks.items[x].artists[i].name
            artistsArr.push(artist);
        }
        
        console.log("Artist(s): " + artistsArr.join(", "));
        console.log("Song Name: " + data.tracks.items[x].name);
        console.log("Check it out here: " + data.tracks.items[x].preview_url);
        console.log("Album: " + data.tracks.items[x].album.name)
        
    }
  
  });
  }
  
});

}
});

}




