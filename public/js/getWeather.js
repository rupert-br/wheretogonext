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
                const cragsInfo = data;
                cragsInfo.map((crag) => {
                    let marker = new L.Marker([crag[5], crag[6]]);
                    marker.bindPopup(`${crag[0]}<br>Routes: ${crag[4]}</br><a href="https://www.8a.nu${crag[2]}/">Link to 8a.nu</a>`).openPopup();
                    marker.addTo(map);
                });

                document.getElementById('results').innerHTML = data;
            });
    });
}