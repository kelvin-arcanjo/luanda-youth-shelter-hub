const map = L.map('map').setView([-8.8383, 13.2344], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let facilitiesData = [];
const markersGroup = L.layerGroup().addTo(map);

// Static fallback data for GitHub Pages / static environments
const initialFacilities = [
  { name: "Hospital Pediátrico David Bernardino", municipality: "Luanda", category: "food_aid", lat: -8.8251, lng: 13.2372 },
  { name: "Lar Kuzola (Centro de Acolhimento)", municipality: "Luanda", category: "shelter", lat: -8.8415, lng: 13.2561 },
  { name: "Centro de Acolhimento de Crianças do Cazenga", municipality: "Cazenga", category: "shelter", lat: -8.8150, lng: 13.2900 },
  { name: "Ponto de Apoio Alimentar de Viana", municipality: "Viana", category: "food_aid", lat: -8.9051, lng: 13.3185 },
  { name: "LARES DOM BOSCO (Casa Anuarite)", municipality: "Luanda", category: "shelter", lat: -8.8782, lng: 13.2514 },
  { name: "Caritas Nacional de Angola", municipality: "Luanda", category: "food_aid", lat: -8.8652, lng: 13.2081 },
  { name: "Centro de Acolhimento Arnalda Janssen", municipality: "Luanda", category: "shelter", lat: -8.8350, lng: 13.2420 },
  { name: "Centro de Acolhimento REMAR Angola", municipality: "Viana", category: "shelter", lat: -8.8920, lng: 13.3510 },
  { name: "Cruz Vermelha de Angola (Sede)", municipality: "Luanda", category: "food_aid", lat: -8.8185, lng: 13.2325 },
  { name: "Aldeia de Crianças SOS Luanda", municipality: "Kamba", category: "shelter", lat: -8.9210, lng: 13.2950 },
  { name: "Banco Alimentar de Luanda", municipality: "Cazenga", category: "food_aid", lat: -8.8250, lng: 13.2850 }
];

const API_URL = 'https://luanda-youth-shelter-hub.onrender.com/api/facilities'

async function fetchFacilities() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API Endpoint unavailable');
    
    const data = await response.json();
    facilitiesData = data;
  } catch (error) {
    console.warn('API server offline or running on static host. Using initial fallback data.', error);
    facilitiesData = [...initialFacilities];
  }

  displayFacilities(facilitiesData);
}

fetchFacilities();

function displayFacilities(facilities) {
  markersGroup.clearLayers();

  facilities.forEach(facility => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;

    const popupContent = `
      <div style="font-family: sans-serif; padding: 2px;">
        <h4 style="margin: 0 0 5px 0; color: #1a252f;">${facility.name}</h4>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #555;">
          <b>Município:</b> ${facility.municipality}<br>
          <b>Categoria:</b> ${facility.category}
        </p>
        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; background-color: #3498db; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; font-size: 12px;">
          🗺️ Como Chegar
        </a>
      </div>
    `;

    const markerOptions = typeof getCategoryIcon === 'function' && getCategoryIcon(facility.category)
      ? { icon: getCategoryIcon(facility.category) }
      : {};

    L.marker([facility.lat, facility.lng], markerOptions)
      .bindPopup(popupContent)
      .addTo(markersGroup);
  });
}

document.getElementById('categoryFilter').addEventListener('change', (e) => {
  const selectedCategory = e.target.value;

  if (selectedCategory === 'all' || selectedCategory === 'Todas as Categorias') {
    displayFacilities(facilitiesData);
  } else {
    const filtered = facilitiesData.filter(f => f.category === selectedCategory);
    displayFacilities(filtered);
  }
});

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
    const response = await fetch(API_URL , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFacility)
    });

    if (response.ok) {
      await fetchFacilities();
    } else {
      // Fallback for static demo mode (GitHub Pages)
      facilitiesData.push(newFacility);
      displayFacilities(facilitiesData);
    }
  } catch (error) {
    console.warn('Backend unavailable, updating local state directly.');
    facilitiesData.push(newFacility);
    displayFacilities(facilitiesData);
  }

  e.target.reset();
  alert('Instalação adicionada com sucesso!');
});

map.on('click', (e) => {
  const { lat, lng } = e.latlng;
  document.getElementById('lat').value = lat.toFixed(4);
  document.getElementById('lng').value = lng.toFixed(4);
});

function getCategoryIcon(category) {
  const isShelter = category === 'shelter' || category === 'Abrigo';
  const pinClass = isShelter ? 'pin-shelter' : 'pin-food';

 return L.divIcon({
    className: 'custom-pin',
    html: `<div class="pin-wrapper"><div class="pin ${pinClass}"></div></div>`,
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -48]
  });
}

