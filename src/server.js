const express = require('express')
const app = express() 
const PORT = 3000

app.use(express.json());
app.use(express.static('.'))

const facilities = [
  {
    id: 1,
    name: "Hospital Pediátrico David Bernardino",
    category: "food_aid",
    municipality: "Luanda",
    lat: -8.8251,
    lng: 13.2372
  },
  {
    id: 2,
    name: "Lar Kuzola (Centro de Acolhimento)",
    category: "shelter",
    municipality: "Luanda",
    lat: -8.8415,
    lng: 13.2561
  },
  {
    id: 3,
    name: "Centro de Acolhimento de Crianças do Cazenga",
    category: "shelter",
    municipality: "Cazenga",
    lat: -8.8150,
    lng: 13.2900
  },
  {
    id: 4,
    name: "Ponto de Apoio Alimentar de Viana",
    category: "food_aid",
    municipality: "Viana",
    lat: -8.9051,
    lng: 13.3185
  },
  {
    id: 5,
    name: "LARES DOM BOSCO (Casa Anuarite)",
    category: "shelter",
    municipality: "Luanda",
    lat: -8.8782,
    lng: 13.2514
  },
  {
    id: 6,
    name: "Caritas Nacional de Angola",
    category: "food_aid",
    municipality: "Luanda",
    lat: -8.8652,
    lng: 13.2081
  },
  {
    id: 7,
    name: "Centro de Acolhimento Horizonte Azul",
    category: "shelter",
    municipality: "Viana",
    lat: -8.9100,
    lng: 13.3300
  },
  {
    id: 8,
    name: "ONG Atos Angola",
    category: "food_aid",
    municipality: "Luanda",
    lat: -8.8500,
    lng: 13.2200
  },
  {
    id: 9,
    name: "Centro de Acolhimento Arnalda Janssen",
    category: "shelter",
    municipality: "Luanda",
    lat: -8.8350,
    lng: 13.2420
  },
  {
    id: 10,
    name: "Centro de Acolhimento REMAR Angola",
    category: "shelter",
    municipality: "Viana",
    lat: -8.8920,
    lng: 13.3510
  },
  {
    id: 11,
    name: "Cruz Vermelha de Angola (Sede)",
    category: "food_aid",
    municipality: "Luanda",
    lat: -8.8185,
    lng: 13.2325
  },
  {
    id: 12,
    name: "Aldeia de Crianças SOS Luanda",
    category: "shelter",
    municipality: "Kamba",
    lat: -8.9210,
    lng: 13.2950
  },
  {
    id: 13,
    name: "Banco Alimentar de Luanda",
    category: "food_aid",
    municipality: "Cazenga",
    lat: -8.8250,
    lng: 13.2850
  }
];

app.get('/api/facilities' , (req , res) => {
    res.json(facilities)
})

app.post('/api/facilities', (req, res) => {
  const newFacility = {
    id: facilities.length + 1,
    ...req.body
  };
  facilities.push(newFacility);
  res.status(201).json(newFacility);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

