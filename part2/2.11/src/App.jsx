import { useState, useEffect } from 'react'
import { FilterPerson } from './components/filterPerson/filterPerson'
import { FormNewPerson } from './components/formNewPerson/formNewPerson'
import { ListPerson } from './components/listPerson/listPerson'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('respuesta', response);
        setPersons(response.data)
      })
  }, [])

  const onHandleName = (ev) => setNewName(ev.target.value)
  const onHandleSetFilter = (ev) => setFilterName(ev.target.value)
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

  return (
    <div>
      <FilterPerson filter={filterName} onHandleSetFilter={onHandleSetFilter} />
      <FormNewPerson
        onHandleName={onHandleName}
        onHanldeSubmit={onHanldeSubmit}
        onHandlePhone={onHandlePhone}
        newName={newName}
        newPhone={newPhone} />
      <ListPerson persons={persons} filter={filterName} />
    </div>
  )
}

export default App