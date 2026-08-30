const map = L.map('map').setView([-8.8383, 13.2344], 12)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)


async function fetchFacilities() {
    try {
        const response = await fetch('/api/facilities')
        const data = await response.json()
        console.log(data)

        data.forEach(facility => {
            L.marker([facility.lat, facility.lng])
            .addTo(map)
            .bindPopup(`<b>${facility.name}</b><br>${facility.municipality}`);
        })

    } catch (error) {
        console.log('Error fetching data:' , error)
    }
}

fetchFacilities();
