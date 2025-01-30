// Basic working of MongoDB

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://gaganishh:${password}@cluster0.az9ee.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(i => console.log(i))
    mongoose.connection.close()
  })
}

else if (process.argv.length===5){
  const person = new Person({
    id: Math.floor(Math.random()*100).toString(),
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}