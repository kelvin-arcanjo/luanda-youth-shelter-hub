const map = L.map('map').setView([-8.8383, 13.2344], 12)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

let facilitiesData = [];
const markersGroup = L.layerGroup().addTo(map);

async function fetchFacilities() {
    try {
        const response = await fetch('/api/facilities')
        const data = await response.json()
        console.log(data)

        facilitiesData = data;


        displayFacilities(facilitiesData); 
      } catch (error) {
        console.log('Error fetching data:' , error)
    }
}

fetchFacilities();

function displayFacilities(facilities) {
    markersGroup.clearLayers()

    facilities.forEach(facility => {
        L.marker([facility.lat, facility.lng])
        .bindPopup(`<b>${facility.name}</b><br>${facility.municipality}`)
        .addTo(markersGroup)
    })
}

document.getElementById('categoryFilter').addEventListener('change' , (e) => {
    const selectedCategory = e.target.value

    if (selectedCategory === 'all') {
        displayFacilities(facilitiesData)

    } else {
        const filtered = facilitiesData.filter(f => f.category === selectedCategory)
        displayFacilities(filtered)
    }
})


document.getElementById('facilityForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newFacility = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    municipality: document.getElementById('municipality').value,
    lat: parseFloat(document.getElementById('lat').value),
    lng: parseFloat(document.getElementById('lng').value)
  };

  try {
    const response = await fetch('/api/facilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFacility)
    });

    if (response.ok) {
      const addedFacility = await response.json();
      facilitiesData.push(addedFacility);
      displayFacilities(facilitiesData);
      e.target.reset();
    }
  } catch (error) {
    console.error('Error adding facility:', error);
  }
});