// require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');



console.log(keys.spotify);
var spotify = new Spotify(keys.spotify);

var switchBoardcommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (switchBoardcommand) {
    case "concert-this":


        break;
    case "spotify-this-song":
        spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // console.log(data.tracks.items[0]);
            for (let i = 0; i < data.tracks.items.length; i++) {
                const element = data.tracks.items[i];
                console.log("Artist : " + element.artists[0].name + ".");
                console.log(element.external_urls.spotify);


            }

        });


        break;
    case "movie-this":


        break;
    case "do-what-it-says":


        break;
    default:
        break;
}



