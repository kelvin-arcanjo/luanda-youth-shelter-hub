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
  markersGroup.clearLayers();

  facilities.forEach(facility => {
    // Generate Google Maps navigation URL using pin coordinates;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;

    const popupContent = `
      <div style="font-family: sans-serif; padding: 2px;">
        <h4 style="margin: 0 0 5px 0; color: #1a252f;">${facility.name}</h4>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #555;">
          <b>Município:</b> ${facility.municipality}<br>
          <b>Categoria:</b> ${facility.category === 'shelter' ? 'Abrigo' : 'Apoio Alimentar'}
        </p>
        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; background-color: #3498db; color: white; padding: 5px 10px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: bold;">
           🗺️ Como Chegar
        </a>
      </div>
    `;

    L.marker([facility.lat, facility.lng], {
      icon: getCategoryIcon(facility.category)
    })
      .bindPopup(popupContent)
      .addTo(markersGroup);
  });
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
     // Refresh list to draw new color-coded marker live;
      await fetchFacilities();

      // Reset form fields;
      e.target.reset();

      // Optional feedback alert;
      alert('Instalação adicionada com sucesso!')
    }

  } catch (error) {
    console.error('Error adding facility:', error);
  }
});

map.on('click' , (e) => {
    const { lat , lng } = e.latlng
    document.getElementById('lat').value = lat.toFixed(4)
    document.getElementById('lng').value = lng.toFixed(4);
})

function getCategoryIcon(category) {
  let className = 'marker-default'

  if (category === 'shelter') {
    className = 'marker-shelter'

  } else if (category === 'food_aid') {
    className = 'marker-food_aid'
  }

  return L.divIcon({
    className: '',
    html: `<div class="custom-marker ${className}"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28], // Align tip of marker to coordinates
    popupAnchor: [0, -28]  // Anchor popup box right above marker
  })
}