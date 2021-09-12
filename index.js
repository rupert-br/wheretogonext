const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config()

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/get_weather/:lat/:lon/:radius', function (req, res) {
    let lat = req.params.lat;
    let lon = req.params.lon;

    console.log(lat, lon);

    let API_key = process.env.API_KEY;
    let url_weather = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`
    console.log(url_weather);

    axios({
        method: 'get',
        url: url_weather
      })
      .then(response => {
          res.send(response.data.current);
      })

  });

app.listen(3030);

console.log('Server started at http://localhost:3030');