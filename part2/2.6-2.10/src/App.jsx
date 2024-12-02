import { useState } from 'react'

const FormNewName = ({ onHandleName, onHanldeSubmit, newName }) => {
  return (
    <form onSubmit={onHanldeSubmit}>
      <div>
        name: <input value={newName} onChange={onHandleName} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onHandleName = (ev) => setNewName(ev.target.value)
  const onHanldeSubmit = (ev) => {
    ev.preventDefault()
    const isNameInvalid = persons.some(person => person.name === newName)
    if (isNameInvalid) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName}))
    }
    setNewName('')
  }
  const showNumbers = () => persons.map(person => <p key={person.name}>{person.name}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <FormNewName onHandleName={onHandleName} onHanldeSubmit={onHanldeSubmit} newName={newName} />
      <h2>Numbers</h2>
      {showNumbers()}
    </div>
  )
}

export default App