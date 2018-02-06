const mongoose = require('mongoose')

const url = 'mongodb://fullstack_user:testipassu@ds046667.mlab.com:46667/dev-puhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    unique: true
  },
  number: String})

personSchema.statics.format = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
