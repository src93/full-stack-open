const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://src93:${password}@course-fullstack.qw0on.mongodb.net/?retryWrites=true&w=majority&appName=course-fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const phone = process.argv[4]

  const person = new Person({
    name,
    phone
  })

  person.save().then(result => {
    console.log(`added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
  })
}
