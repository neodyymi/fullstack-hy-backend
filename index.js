const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post_data', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())

app.use(bodyParser.json())
app.use(morgan(':method :url :post_data :status :res[content-length] - :response-time ms'))

app.use(express.static('build'))


let persons = 
[
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-23456",
    id: 2
  },
  {
    name: "Lea Kutvonen",
    number: "040-456",
    id: 4
  },
  {
    name: "Venla",
    number: "1/0 + (-1/0)",
    id: 6
  },
  {
    name: "pekk",
    number: "14",
    id: 7
  }
]

const generateId = () => Math.floor(Math.random() * Math.floor(Math.pow(2, 32)))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
  <p>Puhelinluettelossa on ${persons.length} henkilön tiedot. </p>
  <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id )

  if ( person ) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  if (person.name === undefined || person.number === undefined) {
    return res.status(400).json({error: 'Name and/or number missing'})
  }
  if (persons.some(p => p.name === person.name)) {
    return res.status(400).json({error: 'Name must be unique'})
  }
  person.id = generateId()

  persons = persons.concat(person)

  res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

