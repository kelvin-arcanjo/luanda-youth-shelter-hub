const express = require('express')
const app = express() 
const PORT = 3000

app.use(express.static('.'))

const facilities = [
    {id: 1 , name: 'xxx' , category: 'yyy' , municipality: 'zzz' , lat: 50.1 , lng: 50.2},
    {id: 2 , name: 'kkk' , category: 'lll' , municipality: 'mmm' , lat: 51.1 , lng: 51.2},
    {id: 3 , name: 'aaa' , category: 'bbb' , municipality: 'ccc' , lat: 52.1 , lng: 52.2}
]

app.get('/api/facilities' , (req , res) => {
    res.json(facilities)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

