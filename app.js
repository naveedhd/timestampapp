var express = require('express');
var app = express();

app.param('timestamp', function(req, res, next, timestamp) {
  // if timestamp found
  var timestampObj = {
    "unix": null,
    "natural": null
  };

  try {
    //res.send(timestamp);
    var date = new Date(timestamp);
    console.log(date.getTime());
    timestampObj.unix = "unixtime";
    timestampObj.natural = "natural";

  } catch(err) {
    console.log("Error occured :" + err);
  } finally {
    res.send(timestampObj);
  }

});

app.get('/', function(req, res) {
  console.log("without params");
  res.send('Hello World');
});

app.get('/:timestamp', function (req, res) {});

app.listen(3000, function() {
  console.log('Listening on 3000!');
});
