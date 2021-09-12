function getWeather(){
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('lon').value;
    let radius = document.getElementById('radius').value;

    let url = `/get_weather/${lat}/${lon}/${radius}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('results').innerHTML = 'The current temperature is ' + data.temp + ' °C';
        });
}