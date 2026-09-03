# Facility Map Luanda (Mapa de Instalações)An interactive full-stack web application built to catalog, locate, and filter social support facilities across the municipalities of Luanda. 

Users can view category-coded map markers, search by municipality, filter by facility type, get external directions via Google Maps, and submit new facilities in real time.FeaturesInteractive Map Integration: Powered by Leaflet.js and OpenStreetMap to display custom geographic markers.Real-time Filtering & Auto-Pan: Filter facilities instantly by category (Abrigo, Apoio Alimentar) or search by municipality with dynamic map bounds centering.Interactive Popups: Click any pin to open a structured detail card with direct navigation links (Como Chegar) mapped via Google Maps coordinates.REST API & Persistence: Node.js and Express backend handling data retrieval (GET /api/facilities) and submission (POST /api/facilities).Dynamic Form Ingestion: Async JavaScript form listener (POST) that captures user input, updates backend memory, and immediately renders new markers without page reloads.Tech StackFrontend: HTML5, CSS3, JavaScript (ES6+), Leaflet.jsBackend: Node.js, Express.jsData Interchange: JSON / REST APIProject StructurePlaintext├── public/          # Static assets
│   ├── index.html   # Main application interface
│   ├── style.css    # UI styling and layout rules
│   └── app.js       # Client-side map logic & event listeners
├── src/
│   └── server.js    # Express backend and REST API endpoints
├── package.json     # Project metadata and dependencies
└── README.md        # Documentation
Getting Started1. PrerequisitesEnsure Node.js is installed on your system.2. InstallationClone the repository and install the required dependencies:Bashgit clone https://github.com/your-username/facility-map-luanda.git
cd facility-map-luanda
npm install
3. Run the ApplicationStart the Node.js server:Bashnode src/server.js
Open your browser and navigate to http://localhost:3000.API EndpointsMethodEndpointDescriptionGET/api/facilitiesFetches the full list of registered facilitiesPOST/api/facilitiesAdds a new facility to the map database