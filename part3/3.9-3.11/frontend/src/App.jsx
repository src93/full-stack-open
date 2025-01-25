import { useState, useEffect } from 'react'
import { FilterPerson } from './components/filterPerson/filterPerson'
import { FormNewPerson } from './components/formNewPerson/formNewPerson'
import { ListPerson } from './components/listPerson/listPerson'
import { BannerInfo } from './components/bannerInfo/bannerInfo'
import { getAllPersons, createPerson, updatePerson, deletePerson } from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllPersons()
      .then(allPersons => setPersons(allPersons))
  }, [])

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
    if (showErrorMessage) {
      setTimeout(() => setShowErrorMessage(false), 5000)
    }
  }, [showSuccessMessage, showErrorMessage])

  const onHandleName = (ev) => setNewName(ev.target.value)
  const onHandleSetFilter = (ev) => setFilterName(ev.target.value)
  const onHandleNumber = (ev) => setNewNumber(ev.target.value)
  const onHanldeSubmit = (ev) => {
    ev.preventDefault()
    if (ensureIsInvalidForm()) {
      return
    }
    if (ensureIsNameDuplicated()) {
      handleNameDuplicated()
    } else {
      handleCreateNewPerson()
    }
    cleanForm()
  }
  const ensureIsInvalidForm = () => !newName || !newNumber
  const ensureIsNameDuplicated = () => {
    return persons.some(person => person.name === newName)
  }
  const cleanForm = () => {
    setNewName('')
    setNewNumber('')
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
      number: newNumber
    }
    createPerson(newPerson)
      .then(newPersonFromServer => {
        setPersons(persons.concat(newPersonFromServer))
        setShowSuccessMessage(true)
        setMessage(`Added ${newPersonFromServer.name}`)
      })
  }
  const handleNameDuplicated = () => {
    const userWantChangeNumber = window.confirm(`${newName} is already added to Numberbook, replace the old number with a new one`)
      if (userWantChangeNumber) {
        const person = {...persons.find(person => person.name === newName)}
        person.number = newNumber
        updatePerson(person)
          .then(response => {
            setPersons(persons.map(person => {
              return person.id !== response.id ? person : response
            }))
            setShowSuccessMessage(true)
            setMessage(`Updated ${response.name}`)
          })
          .catch(err => {
            setShowErrorMessage(true)
            setMessage(`Information of ${newName} has already been removed from server`)
          })
      }
  }

  return (
    <div>
      <FilterPerson filter={filterName} onHandleSetFilter={onHandleSetFilter} />
      {
        showSuccessMessage ?
        (
          <BannerInfo message={message} type={'success'} />
        ) :
        ''
      }
      {
        showErrorMessage ?
        (
          <BannerInfo message={message} type={'error'} />
        ) :
        ''
      }

      <FormNewPerson
        onHandleName={onHandleName}
        onHanldeSubmit={onHanldeSubmit}
        onHandleNumber={onHandleNumber}
        newName={newName}
        newNumber={newNumber} />
      <ListPerson
        persons={persons}
        filter={filterName}
        onHandleDelete={onHandleDelete}
        />
    </div>
  )
}

export default App