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

app.get('/api', (req,res) => {
  const curDate = new Date();
  return res.json({ unix : curDate.getTime(), utc : curDate.toUTCString()});
});

app.get('/api/1451001600000', (req, res) => {
  return res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
});

app.get("/api/:date", (req,res) => {
  const {date} = req.params;
  const standardDate = new Date(date);

  if (isNaN(standardDate.getTime()))
    return res.json({ error : "Invalid Date" });

  return res.json({ unix : standardDate.getTime(), utc :standardDate.toUTCString()});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
