function getWeather(){
    navigator.geolocation.getCurrentPosition(function (position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;

        let lat = currentLatitude;
        let lon = currentLongitude;
        let radius = document.getElementById('radius').value;
    
        let url = `/get_weather/${lat}/${lon}/${radius}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('results').innerHTML = data;
            });
    });
}