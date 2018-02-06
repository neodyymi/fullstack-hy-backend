const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('post_data', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :post_data :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  let count = 0
  Person.count({})
    .then(c => {
      res.send(`
      <p>Puhelinluettelossa on ${c} henkilön tiedot. </p>
      <p>${new Date()}</p>
      `)
  })
  
})

app.get('/api/persons', (req, res) => {
  Person
    .find({}, {__v: 0})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
      res.status(404).end()
    })
})


app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(Person.format(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      res.json(Person.format(savedPerson))
    })
    .catch(error => {
      console.log(error)
      if(error.name === 'BulkWriteError') {
        res.status(400).send({ error: 'Person exists' })
      } else {
        res.status(400).send({ error: 'Malformed data' })
      }
    })
    
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true } )
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

