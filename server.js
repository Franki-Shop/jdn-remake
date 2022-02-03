const express = require('express');
const fs = require('fs');
const app = express();

var entities = require('./files/entities.json');
var xprewards = require('./files/getXPRewards.json');
var categories = require('./files/getCategories.json');
var songsprice = require('./files/getSongsPrice.json');
var getmessage = require('./files/getInGameMessages.json');
var getpreviewvideo = require('./files/getPreviewVideo.json');
var getsocialdata = require('./files/getSocialData.json');
var published = require ('./files/published.json');
var avatars = require ('./files/avatars.json')

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "jdn-remake.glitch.me"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.options('/v2/spaces/b53239ea-94df-4b05-a6d1-0f184eec2241/entities', (req, res) => {
	res.send(entities);
});
app.get('/v2/spaces/b53239ea-94df-4b05-a6d1-0f184eec2241/entities', (req, res) => {
	res.send(entities);
});
app.options('/getXPRewards', (req, res) => {
	res.send(xprewards);
});
app.get('/getXPRewards', (req, res) => {
	res.send(xprewards);
});
app.options('/getSongsPrice', (req, res) => {
	res.send(songsprice);
});
app.get('/getSongsPrice', (req, res) => {
	res.send(songsprice);
});
app.options('/getCategories', (req, res) => {
	res.send(categories);
});
app.get('/getCategories', (req, res) => {
	res.send(categories)
});
app.options('/getInGameMessages', (req, res) => {
	res.send(getmessage);
});
app.get('/getInGameMessages', (req, res) => {
	res.send(getmessage);
});
app.options('/v1/songs/published', (req, res) => {
	res.send(published);
});
app.get('/v1/songs/published', (req, res) => {
	res.send(published);
});
app.options('/v1/avatars', (req, res) => {
	res.send(avatars);
});
app.get('/v1/avatars', (req, res) => {
	res.send(avatars);
});
app.get('/getPreviewVideo', (req, res) => {
  var getCodename = req.query.song;
  if(getpreviewvideo[getCodename]){
    res.send(getpreviewvideo[getCodename])
  } else if(!getpreviewvideo[getCodename]){
    res.send({
      "url": "",
      "cookie": "",
      "song": getCodename
    })
  }
});
app.get('/getSocialData', (req, res) => {
  var getCodename = req.query.song;
  if(getsocialdata[getCodename]){
    res.send(getsocialdata[getCodename])
  } else if(!getsocialdata[getCodename]){
    res.send({
      "func": "socialData",
      "song": getCodename,
      "data":{
        "communityStats":[
          {
            "oasisParams": {
              "[number]":0
            },
            "oasisText":"1027"
          },
          {
            "oasisParams": {
              "[number]":0
            },
            "oasisText":"1028"
          }
        ]
      }
    })
  }
});

// Check https
function checkHttps(req, res, next){
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}

app.all('*', checkHttps);
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});