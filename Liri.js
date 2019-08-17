// require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

// console.log(keys.spotify);
var spotify = new Spotify(keys.spotify);

var switchBoardcommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");





switch (switchBoardcommand) {
    case "concert-this":

        axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
            function (concertresponse) {

                for (let i = 0; i < concertresponse.data.length; i++) {
                    const element = concertresponse.data[i].venue;
                    const elementtwo = concertresponse.data[i];
                    var momentTime = moment(elementtwo.datetime)
                    // console.log(elementtwo.datetime);
                    var formatmomentTime = moment(momentTime).format('MMMM Do YYYY, h:mm:ss a');
                    // console.log(formatmomentTime)

                    console.log("========================================================================================================================================");
                    console.log("");
                    console.log("");
                    console.log("~~~ Here are some concert dates I found for", concertresponse.data[i].lineup[0] + "'s", "tour dates~~~");
                    console.log("");
                    console.log("Venue: The", element.name, "in", element.city + ",", element.country, "on", formatmomentTime);
                    console.log("");
                    console.log("If needed, I linked a webpage to buy the tickets!");
                    // console.log(elementtwo);
                    console.log(elementtwo.url);
                    console.log("");
                    console.log("");
                }
            })
            .catch(function (error) {
                if (response === "") {
                    console.log("Its empty");

                } else {
                    console.log(error);
                }

            });

        break;

    case "spotify-this-song":
        spotifySong(userInput);
        break;

    case "movie-this":

        axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                console.log("========================================================================================================================================");
                console.log("");
                console.log("~~~ Ok, here is what I found for", response.data.Title + " ~~~");
                console.log("");
                console.log(response.data.Title, "was released in", response.data.Year + ", and was filmed in the", response.data.Country + ";", "in", response.data.Language + ".");
                console.log(response.data.Title, "included a phenominal cast consisting of", response.data.Actors, "and together created a film about", response.data.Plot + "");
                console.log("");
                console.log("The IMDB movie rating for", response.data.Title, "is", response.data.imdbRating + ",");
                console.log("Rotten Tomato also gave", response.data.Title, "an", response.data.Ratings[1].Value + ".");
                console.log("");
                console.log("========================================================================================================================================");

            })
            .catch(function (error) {
                if (error) {
                    console.log(error);

                } else {
                    console.log();
                }

            });
        break;

    case "do-what-it-says":


        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }


            // console.log(data);
            var randomtxtArry = data.split(",")[1];
            spotifySong(randomtxtArry);




        });

        break;
    default:
        break;
}

function spotifySong(query) {
    spotify.search({ type: 'track', query, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks.items[0]);
        for (let i = 0; i < data.tracks.items.length; i++) {
            const element = data.tracks.items[i];
            console.log("========================================================================================================================================");
            console.log("");
            console.log("~~~ Ok, here is what I found for your song search ~~~");
            console.log("");
            console.log("The artist for the song you searched is", element.artists[0].name + ",", element.artists[0].name, "released", element.name, "on the", element.album.name, "album"); //title "in", //year, "on the", //albumname, "album.");
            console.log("");
            console.log("I provided a preview of the song here.");
            // console.log(element.album.external_urls.name);
            console.log(element.external_urls.spotify);
            console.log("");
            console.log("========================================================================================================================================");
            // console.log(element.album.release_day)
        }

    });
}

