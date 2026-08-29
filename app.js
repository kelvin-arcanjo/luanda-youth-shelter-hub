async function fetchFacilities() {
    try {
        const response = await fetch('/api/facilities')
        const data = await response.json()
        console.log(data)

    } catch (error) {
        console.log('Error fetching data:' , error)
    }
}

fetchFacilities();