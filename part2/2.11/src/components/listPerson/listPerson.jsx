import { ItemPerson } from "../itemPerson/itemPerson"

const ListPerson = ({ persons, filter }) => {
  const filterList = persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <>
      <h2>Numbers</h2>
      {filterList.map(person => <ItemPerson key={person.name} name={person.name} phone={person.phone} />)}
    </>
  )
}

export {
  ListPerson
}