const express = require('express')
const app = express() 
const PORT = 3000

app.use(express.static('.'))

const facilities = [
    {
        id: 1 , 
        name: "Centro de Acolhimento de Luanda" , 
        category: "shelter" , 
        municipality: "Luanda" , 
        lat: -8.8383 , 
        lng: 13.2344
    },

    {
        id: 2 , 
        name: "Apoio Alimentar Cazenga" , 
        category: "food_aid" , 
        municipality: "Cazenga", 
        lat: -8.8150 , 
        lng: 13.2900
    },

    {
        id: 3 , 
        name: 'aaa' , 
        category: 'bbb' , 
        municipality: 'ccc' , 
        lat: 52.1 , 
        lng: 52.2
    }
]

app.get('/api/facilities' , (req , res) => {
    res.json(facilities)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

