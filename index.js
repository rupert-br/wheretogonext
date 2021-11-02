const express = require('express');
const axios = require('axios');
const parse = require('csv-parse');
const fs = require('fs');

require('dotenv').config()

const path = __dirname + '/public';
const app = express();

app.use(express.static(path));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path + '/index.html');
})

app.get('/get_rating', function (req, res) {
    const data = req.query
    const pop = data.pop
    const distance = parseFloat(data.distance)
    const temp = parseFloat(data.temp)
    const wind = parseFloat(data.wind*3.6)
    const humidity = parseFloat(data.humidity)
    
    function getRating (pop, distance, temp, wind, humidity) {
        let rating = 0
        if (pop > 0 && pop <= 0.5) {
            rating += 1
        }
        else if (pop > 0.5 && pop <= 0.7) {
            rating += 3
        }
        else if (pop > 0.7) {
            rating += 5
        }
        
        if (temp > 0 && temp <= 10) {
            rating = rating + 1
        }
        if (temp > 20 && temp <= 30) {
            rating = rating + 1
        }
        if (temp > 30) {
            rating = rating + 3
        }

        if (distance > 50 && distance <= 100) {
            rating = rating + 1
        }
        else if (distance > 100 && distance <= 200) {
            rating = rating + 3
        }
        else if (distance > 200) {
            rating = rating + 4
        }

        if (wind > 0 && wind <= 2) {
            rating += 1
        }
        else if (wind > 10 && wind  <= 28) {
            rating += 0.5
        }
        else if (wind > 28) {
            rating += 2
        }

        if (humidity > 0.5) {
            rating += 1
        }
        return rating
    }

    const rating = getRating(pop, distance, temp, wind, humidity)
    res.json(rating)
})

app.get('/get_weather/:lat/:lon', function (req, res) {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let API_key = process.env.API_KEY;
    let url_weather = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_key}`
    axios({
        method: 'get',
        url: url_weather
      })
      .then(response => {
          res.send(response.data);
      })
      .catch(error => {
        console.log(error)
     })
  });

app.get('/get_city_by_posititon/:lat/:lon', function(req, res){
    const lat = req.params.lat
    const lon = req.params.lon
    const url_cityByPosition = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    axios({
        method: 'get',
        url: url_cityByPosition
    })
    .then(response => {
        res.send(response.data)
    })
})

app.get('/get_city/:searchStr', function(req, res) {
    let searchStr = req.params.searchStr;
    // const url_city = `https://warnungen.zamg.at/wsapp/api/searchLocation?s=${searchStr}`
    const url_city = `https://nominatim.openstreetmap.org/search.php?q=${searchStr}&format=json&countrycodes=at`
    axios({
        method: 'get',
        url: url_city
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        console.log(error)
     })
});

app.listen(process.env.PORT || 5000);

console.log('Server started at http://localhost:5000');