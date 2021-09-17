const express = require('express');
const path = require('path');
const axios = require('axios');
const parse = require('csv-parse');
const fs = require('fs');

const distance = require("./public/js/calculateDistance");

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
    let radius = req.params.radius

    const csvData = [];
    fs.createReadStream('crags_austria.csv')
        .pipe(parse({delimiter: ';', from_line: 2}))
        .on('data', function(csvrow) {
            if (distance.calculateDistance(lat, lon, csvrow[5], csvrow[6]) < radius) {
                let distanceFromHome = distance.calculateDistance(lat, lon, csvrow[5], csvrow[6]);
                let API_key = process.env.API_KEY;
                csvrow.splice(5, 2);
                csvrow.splice(1, 2);
                
                //let url_weather = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_key}`
                csvrow.push(Math.round(distanceFromHome));
                csvData.push(csvrow);
            }     
        })
        .on('end',function() {
            console.log(csvData);
            var csvJson = JSON.stringify(csvData);
            console.log(csvJson);

            res.send(csvJson);
        });

    
    

    //
    //
    //console.log(url_weather);

    //axios({
    //    method: 'get',
    //    url: url_weather
    //  })
    //  .then(response => {
    //      res.send(response.data.current);
    //  })

  });

app.listen(3030);

console.log('Server started at http://localhost:3030');