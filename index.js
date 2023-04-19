// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint... 
app.get("/api", function (req, res) {
  const utcDate = new Date().toUTCString()
  const unixDate = toTimestamp(utcDate) * 1000
  res.json({"unix": unixDate, "utc": utcDate})
})
      
app.get("/api/:date", function (req, res) {
  try {
    const paramsData = req.params.date

    if (isValidDate(paramsData)) {
      const unixDate = toTimestamp(paramsData) * 1000
      const utcDate = new Date(unixDate).toUTCString()
      res.json({"unix": unixDate, "utc": utcDate})

    } else if (!paramsData.includes("-")) {
      const unixDate = parseInt(paramsData)
      const utcDate = new Date(unixDate).toUTCString()
      res.json({"unix": unixDate, "utc": utcDate})
      
    } else {
      res.json({"error" : "Invalid Date"})
      
    }

  } catch (err) {
    res.json({"error" : "Invalid Date"})
    
  }
})

// Validate Dates
function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  
  if(!dateString.match(regEx)) {
    return false
  }
  
  const d = new Date(dateString)
  const dNum = d.getTime()
  
  if(!dNum && dNum !== 0) {
    return false
  }
  
  return d.toISOString().slice(0,10) === dateString
}

// Function to convert to Timestamp
function toTimestamp(strDate) {
  const dt = Date.parse(strDate)
  return dt / 1000
}

// listen for requests :) 
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
