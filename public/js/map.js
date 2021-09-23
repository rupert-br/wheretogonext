let mapOptions = {
    center: [47.79941, 13.04399],
    zoom: 7,
    zoomControl: false
}


let map = new L.map('mapid' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

L.control.zoom({
    position: 'topright'
}).addTo(map);

//let marker = new L.Marker([51.958, 9.141]);
//marker.addTo(map);