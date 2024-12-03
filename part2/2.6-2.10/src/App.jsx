import { useState } from 'react'

const FormNewName = ({ onHandleName, onHanldeSubmit, newName, onHandlePhone, newPhone }) => {
  return (
    <form onSubmit={onHanldeSubmit}>
      <div>
        name: <input value={newName} onChange={onHandleName} />
      </div>
      <div>number: <input value={newPhone} onChange={onHandlePhone} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123123' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  const onHandleName = (ev) => setNewName(ev.target.value)
  const onHandleFilter = (ev) => setFilterName(ev.target.value)
  const onHandlePhone = (ev) => setNewPhone(ev.target.value)
  const onHanldeSubmit = (ev) => {
    ev.preventDefault()
    const isNameInvalid = persons.some(person => person.name === newName)
    if (isNameInvalid) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewPhone('')
  }
  const showNumbers = () => persons.filter(
    person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())
  ).map(
    person => <p key={person.name}>{person.name} {person.phone}</p>
  )

  return (
    <div>
      <h2>phonebook</h2>
      <input value={filterName} onChange={onHandleFilter} />
      <h2>Add a new</h2>
      <FormNewName
        onHandleName={onHandleName}
        onHanldeSubmit={onHanldeSubmit}
        onHandlePhone={onHandlePhone}
        newName={newName}
        newPhone={newPhone} />
      <h2>Numbers</h2>
      {showNumbers()}
    </div>
  )
}

export default App