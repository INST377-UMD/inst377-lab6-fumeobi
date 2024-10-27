// map
const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// rcg
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
// range provided
const latitudes = [getRandomInRange(30, 35, 3), getRandomInRange(30, 35, 3), getRandomInRange(30, 35, 3)];
const longitudes = [getRandomInRange(-90, -100, 3), getRandomInRange(-90, -100, 3), getRandomInRange(-90, -100, 3)];

// markers
latitudes.forEach((lat, index) => {
    const lon = longitudes[index];
    const marker = L.marker([lat, lon]).addTo(map);

    // locality
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Unknown locality';

            
            marker.bindPopup(`Marker ${index + 1}: Latitude: ${lat}, Longitude: ${lon} <br> Locality: ${locality}`).openPopup();

            // coordinates and locality under map
            document.getElementById(`marker${index + 1}`).innerHTML = `Marker ${index + 1}: Latitude: ${lat}, Longitude: ${lon} <br> Locality: ${locality}`;
        })
        .catch(error => console.error('Error fetching locality data:', error));
});
