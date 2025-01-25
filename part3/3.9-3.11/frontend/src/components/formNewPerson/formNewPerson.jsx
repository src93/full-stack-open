const FormNewPerson = ({ onHandleName, onHanldeSubmit, newName, onHandleNumber, newNumber }) => {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={onHanldeSubmit}>
        <div>
          name: <input value={newName} onChange={onHandleName} />
        </div>
        <div>number: <input value={newNumber} onChange={onHandleNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export {
  FormNewPerson
}