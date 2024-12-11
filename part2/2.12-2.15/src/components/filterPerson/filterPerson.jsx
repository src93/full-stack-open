const FilterPerson = ({filter, onHandleSetFilter}) => {
  return (
    <>
      <h2>phonebook</h2>
      <span>
        Filter shown with
        <input value={filter} onChange={onHandleSetFilter} />
      </span>
    </>
  )
}

export {FilterPerson}