const FilterPerson = ({filter, onHandleSetFilter}) => {
  return (
    <>
      <h2>phonebook</h2>
      <input value={filter} onChange={onHandleSetFilter} />
    </>
  )
}

export {FilterPerson}