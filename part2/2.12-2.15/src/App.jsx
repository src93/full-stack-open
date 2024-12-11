import { useState, useEffect } from 'react'
import { FilterPerson } from './components/filterPerson/filterPerson'
import { FormNewPerson } from './components/formNewPerson/formNewPerson'
import { ListPerson } from './components/listPerson/listPerson'
import { getAllPersons, createPerson, updatePerson, deletePerson } from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    getAllPersons()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const onHandleName = (ev) => setNewName(ev.target.value)
  const onHandleSetFilter = (ev) => setFilterName(ev.target.value)
  const onHandlePhone = (ev) => setNewPhone(ev.target.value)
  const onHanldeSubmit = (ev) => {
    ev.preventDefault()
    if (ensureIsNameDuplicated()) {
      handleNameDuplicated()
    } else {
      handleCreateNewPerson()
    }
    cleanForm()
  }
  const ensureIsNameDuplicated = () => {
    return persons.some(person => person.name === newName)
  }
  const cleanForm = () => {
    setNewName('')
    setNewPhone('')
  }
  const onHandleDelete = ({id, name}) => {
    return () => {
      const canDeletePerson = window.confirm(`delte ${name}?`);
      if (canDeletePerson) {
        deletePerson(id)
          .then((response) => {
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
  }
  const handleCreateNewPerson = () => {
    const newPerson = {
      name: newName,
      phone: newPhone
    }
    createPerson(newPerson)
      .then(newPersonFromServer => {
        setPersons(persons.concat(newPersonFromServer))
      })
  }
  const handleNameDuplicated = () => {
    const userWantChangeNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
      if (userWantChangeNumber) {
        const person = {...persons.find(person => person.name === newName)}
        person.phone = newPhone
        updatePerson(person)
          .then(response => {
            setPersons(persons.map(person => {
              return person.id !== response.id ? person : response
            }))
          })
      }
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
      <ListPerson
        persons={persons}
        filter={filterName}
        onHandleDelete={onHandleDelete}
        />
    </div>
  )
}

export default App