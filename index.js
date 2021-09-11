const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/get_weather/:one/:two/:radius', function (req, res) {
    res.send(req.params);
  });

app.listen(3000);

console.log('Server started at http://localhost:3000');