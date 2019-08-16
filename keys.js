// console.log('this is loaded');
var env = require("dotenv");
env.config();

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
