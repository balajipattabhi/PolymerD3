var express = require('express')
var path = require('path')
var app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})


app.use(express.static(path.join(__dirname, '/')));


var server = app.listen(process.env.VCAP_APP_PORT || 5000, function () {
	console.log ('Server started on port: ' + server.address().port);
});
