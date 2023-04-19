// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  try {
    let paramsData = req.params.date

    if (isValidDate(paramsData)) {
      let unixDate = toTimestamp(paramsData) * 1000
      let utcDate = new Date(unixDate).toUTCString()
      res.json({"unix": unixDate, "utc": utcDate})

    } else {
      let utcDate = new Date(Number(paramsData)).toUTCString()
      res.json({"unix": Number(paramsData), "utc": utcDate})
    }

  } catch (err) {
    res.json({"err" : "Invalid Date"})
  }
  
});

// Validate Dates
function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/
  if(!dateString.match(regEx)) return false
  var d = new Date(dateString)
  var dNum = d.getTime()
  if(!dNum && dNum !== 0) return false
  return d.toISOString().slice(0,10) === dateString
}

// Function to convert to Timestamp
function toTimestamp(strDate) {
  const dt = Date.parse(strDate)
  return dt / 1000
};


// listen for requests :) 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});
