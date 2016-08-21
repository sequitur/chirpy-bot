var fs = require('fs-jetpack');
var Twit = require('twit');

var auth = fs.read('api_keys.json', 'json');
var t = new Twit(auth);

function chirp () {
  /* Returns a random chirping noise
     Originally, this bot only tweeted "Chirp!" repeated a random number of
     times. This isn't enough variation for a bot; the Twitter API will reject
     duplicate tweets. So instead we have a 5 unique bird noises, repeated 1 to
     7 times, for 97655 possible tweets.
  */

  var chirps = [
    'Chirp!',
    'Tweep!',
    'Chirrup!',
    'Twip!',
    'Peep!'
  ];

  return chirps[Math.floor(Math.random() * chirps.length)];
}

function generateTweet () {
  // Generate a random number from 1 to 7;
  var n = Math.floor(Math.random() * 7  + 1);
  // Create a string of that many chirps
  return Array(n).fill('').map(chirp).join(' ');
}

exports.generate = generateTweet;

exports.tweet = function tweet () {
  if (Math.random() > 0.5) {
    console.log("Not tweeting right now");
    return;
  }

  function callback (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }

  t.post('statuses/update', { status: generateTweet() }, callback);
}
