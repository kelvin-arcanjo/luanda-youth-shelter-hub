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
    } ,
    
    {
        id: 2,
        name: "Lar Kuzola (Centro de Acolhimento)",
        category: "shelter",
        municipality: "Luanda",
        lat: -8.8415,
        lng: 13.2561
    },

    {
        id: 3 , 
        name: "Centro de Acolhimento de Crianças do Cazenga" , 
        category: "shelter" , 
        municipality: "Cazenga" , 
        lat: -8.8150,
        lng: 13.2900
    },

    {
        id: 4,
        name: "Ponto de Apoio Alimentar de Viana",
        category: "food_aid",
        municipality: "Viana",
        lat: -8.9133,
        lng: 13.3719
    },

    {
        id: 5,
        name: "Centro Comunitário de Talatona",
        category: "shelter",
        municipality: "Talatona",
        lat: -8.9200,
        lng: 13.1833
    }
]

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

