const FormNewPerson = ({ onHandleName, onHanldeSubmit, newName, onHandlePhone, newPhone }) => {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={onHanldeSubmit}>
        <div>
          name: <input value={newName} onChange={onHandleName} />
        </div>
        <div>Phone: <input value={newPhone} onChange={onHandlePhone} /></div>
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