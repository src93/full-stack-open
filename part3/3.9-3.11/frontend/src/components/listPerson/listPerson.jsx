import { ItemPerson } from "../itemPerson/itemPerson"

const ListPerson = ({ persons, filter, onHandleDelete }) => {
  const filterList = persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
  return (
    <>
      <h2>Numbers</h2>
      {filterList.map(person => {
          return (
            <ItemPerson
              key={person.id}
              name={person.name}
              phone={person.phone}
              onHandleDelete={onHandleDelete}
              id={person.id} />
          )
        }
      )}
    </>
  )
}

export {
  ListPerson
}