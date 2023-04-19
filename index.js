// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  try {
    let paramsData = req.params.date
    if (dateIsValid(paramsData)) {
      res.json({"unix": paramsData, "utc": paramsData});
    } else {
      res.json({"err" : "Invalid Date"})
    }

  } catch (err) {
    res.json({"err" : "Invalid Date"})
  }
  
});

// Validate Dates
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
