function getWeather(){
    var one = document.getElementById('inputEmail4');
    let url = '/get_weather'
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));
}