const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla!
const url = 'mongodb://fullstack_user:testipassu@ds046667.mlab.com:46667/dev-puhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(process.argv[2] && process.argv[3]) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  
  person
    .save()
    .then(response => {
      console.log(response)
      mongoose.connection.close()
    })
} else {
  console.log("Puhelinluettelo:")
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(`${person.name}\t${person.number}`)
    })
    mongoose.connection.close()
  })
}


