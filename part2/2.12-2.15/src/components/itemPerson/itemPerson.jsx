import './itemPerson.css'

const ItemPerson = ({ name, phone, id, onHandleDelete }) => {
  return (
    <div className='contentItem'>
      <p>{name} {phone}</p>
      <button onClick={onHandleDelete({id, name})}>delete</button>
    </div>
  )
}

export {
  ItemPerson
}