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
    if (ensureIsNameInvalid()) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      phone: newPhone
    }
    createPerson(newPerson)
      .then(newPersonFromServer => {
        setPersons(persons.concat(newPersonFromServer))
      })
    cleanForm()
  }
  const ensureIsNameInvalid = () => {
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
            console.log('respuesta', response);
            const newListPersons = persons.filter(person => person.id !== id)
            setPersons(newListPersons)
          })
      }
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