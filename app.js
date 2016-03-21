var express = require('express'),
    app = express();


var port = process.env.PORT || 3000;
var monthLookup = {
  'Jan': "January", 'Feb': "February", 'Mar': "March",
  'Apr': "April",   'May': "May",      'Jun': "June",
  'Jul': "July",    'Aug': "August",   'Sep': "September",
  'Oct': "October", 'Nov': "November", 'Dec': "December"
}

app.param('timestamp', function(req, res, next, timestamp) {
  var timestampObj = {
    "unix": null,
    "natural": null
  };

  try {
    if (!isNaN(parseFloat(timestamp))) {
      var date = new Date(parseFloat(timestamp) * 1000);
    } else {
      var date = new Date(timestamp);
    }
    timestampObj.unix = date.getTime() / 1000;
    var dateStrLst = date.toString().split(' ');
    timestampObj.natural = monthLookup[dateStrLst[1]] + " " + dateStrLst[2] + ", " + dateStrLst[3];

  } catch(err) {
    console.log("Error occured :" + err);
  } finally {
    res.send(timestampObj);
  }

});

app.get('/', function(req, res) {  
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:timestamp', function (req, res) {});

app.listen(port, function() {
  console.log('Listening on '+ port + '!');
});
