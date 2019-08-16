// require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
// console.log(keys.spotify);
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
                console.log("");
                console.log("~~~ Ok, here is what I found for your song search ~~~");
                console.log("The artist for the song you searched is", element.artists[0].name + ",", element.artists[0].name, "released"); //title "in", //year, "on the", //albumname, "album.");
                console.log("I provided a preview of the song here, hope you enjoy it", "😁", "", element.external_urls.spotify);
                // console.log(element.album.external_urls.name);


            }

        });
        break;

    case "movie-this":

        axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("");
                console.log("~~~ Ok, here is what I found for", response.data.Title + " ~~~");
                console.log(response.data.Title, "was released in", response.data.Year + ", and was filmed in the", response.data.Country + ";", "in", response.data.Language + ".");
                console.log(response.data.Title, "included a phenominal cast consisting of", response.data.Actors, "and together created a film about", response.data.Plot + "");
                console.log("");
                console.log("The IMDB movie rating for", response.data.Title, "is", response.data.imdbRating + ",");
                console.log("Rotten Tomato also rated", response.data.Title, response.data.Ratings[1] + ".");

            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error);

                } else {
                    console.log();
                }

            });
        break;

    case "do-what-it-says":


        break;
    default:
        break;
}



