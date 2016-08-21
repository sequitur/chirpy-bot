var TwitterPinAuth = require('twitter-pin-auth');
var fs = require('fs-jetpack');
var ncp = require('copy-paste');
var prompt = require('prompt');

var auth = fs.read('api_keys.json', 'json');

var twitterPinAuth = new TwitterPinAuth(auth.consumer_key, auth.consumer_secret);

twitterPinAuth.requestAuthUrl()
    .then(function(url) {
        console.log('Received auth URL...');
        ncp.copy(url, function () {
          console.log('URL pasted to clipboard');
          prompt.start();
          prompt.get(['PIN'], function (err, result) {
            twitterPinAuth.authorize(Number(result.PIN))
              .then(function (data) {
                console.log('Access token:', data.accessTokenKey);
                console.log('Access secret:', data.accessTokenSecret);
                ncp.copy('Access token ' + data.accessTokenKey + '\n' +
                'Access secret ' + data.accessTokenSecret);
              })
              .catch(function(err) {
                console.error(err);
              });
          })
        })
    }).catch(function(err) {
        console.error(err);
    });
