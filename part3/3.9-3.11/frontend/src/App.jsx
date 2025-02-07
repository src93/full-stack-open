import { useState, useEffect } from 'react'
import { FilterPerson } from './components/filterPerson/filterPerson'
import { FormNewPerson } from './components/formNewPerson/formNewPerson'
import { ListPerson } from './components/listPerson/listPerson'
import { BannerInfo } from './components/bannerInfo/bannerInfo'
import { getAllPersons, createPerson, updatePerson, deletePerson } from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
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
  const onHandlePhone = (ev) => setNewPhone(ev.target.value)
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
  const ensureIsInvalidForm = () => !newName || !newPhone
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
        setShowSuccessMessage(true)
        setMessage(`Added ${newPersonFromServer.name}`)
      })
      .catch(err => {
        setShowErrorMessage(true)
        setMessage(err.response.data.error)
      })
  }
  const handleNameDuplicated = () => {
    const userWantChangePhone = window.confirm(`${newName} is already added to Numberbook, replace the old phone with a new one`)
      if (userWantChangePhone) {
        const person = {...persons.find(person => person.name === newName)}
        person.phone = newPhone
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