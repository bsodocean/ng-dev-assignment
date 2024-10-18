const express = require('express')
const bodyParser = require('body-parser')

// Port setup
const PORT = 5001

// Dummy DATA
let CARS = [
    { id: '1', model: 'Octavia', engine: '2,0 TSI', color: 'green' },
    { id: '2', model: 'Octavia', engine: '1,4 TSI', color: 'white' },
    { id: '3', model: 'Octavia', engine: '1,5 TSI', color: 'black' },
    { id: '4', model: 'Kamiq', engine: '2,0 TDI', color: 'green' },
    { id: '5', model: 'Kamiq', engine: '1,5 TSI', color: 'black' },
    { id: '6', model: 'Superb', engine: '2,0 TSI', color: 'lime' }
]

// Creating a new server instance
const app = express()

// CORS middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json())

// app.get('/api/cars/:model', (req, res) => {

//     // Validation
//     const { model } = req.params
//     if (model !== 'Octavia' && model !== 'Kamiq' && model !== 'Superb') return res.json({error: `Wrong parameter (use Octavia, Kamiq or Superb) instead of ':model' in URL. Be careful, it's case sensitive`}).status(422)

//     // Filtering cars by model
//     const filteredCars = CARS.filter(car => car.model === model)

//     // Returning results
//     res.json({ data: filteredCars }).status(200)
// })

app.get('/api/cars', (req, res) => {
    // Returning all cars with delay (to see loading state u FE)
    setTimeout(() => res.status(200).json({ data: CARS }), 0)
})

app.post('/api/cars', (req, res) => {
    const { model, engine, color } = req.body
    console.log(req.body)

    if (!model || !engine || !color) return res.status(422).json({error: 'Invalid inputs. Required: model, engine and color'})

    // Creating new car object
    const newCar = {
        id: Math.floor(((1.01 - Math.random()) * new Date())).toString(),
        model,
        engine,
        color
    }

    CARS.push(newCar)

   res.status(200).json({ message: 'success', addedCar: newCar })
})

app.delete('/api/cars/:id', (req, res) => {
    const { id } = req.params

    if (!id) return res.status(422).json({error: 'Invalid id'})

    const carExists = !!CARS.filter(car => car.id === id)[0]

    if (!carExists) return res.status(422).json({error: 'Car not found'})

    CARS = CARS.filter(car => car.id !== id)

    res.status(200).json({ message: 'success', deletedCarWithId: id })
})

// API Points Description
app.get('/', (req, res) => {
    res.send(` 
        <h2>Available API points:</h2>
        <ul>
            <li>GET <a href="http://localhost:${PORT}/api/cars" >/api/cars</a> - Gets a list of all cars</li>
            <li>POST /api/cars - Adds a car to the list (body: { model: 'string', engine: 'string', color: 'string' })</li>
            <li>DEL /api/cars/:id - Removes a car from the list (provide id of car you want to remove to the end of the URL)</li>
        </ul>
       `)
})

app.listen(PORT)