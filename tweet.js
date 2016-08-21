var fs = require('fs-jetpack');
var Twit = require('twit');

var auth = fs.read('api_keys.json', 'json');
var t = new Twit(auth);

function generateTweet () {
  // Generate a random number from 1 to 7;
  var n = Math.floor(Math.random() * 7  + 1);
  // Create a string of that many chirps
  return Array(n).fill('Chirp!').join(' ');
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
