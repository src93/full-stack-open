import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../../server/glq/mutation'
import { ALL_AUTHORS, ALL_GENRES } from '../../server/glq/queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [showError, setShowError] = useState(false)
  const [addBookError, setAddBookError] = useState(null)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES } ],
    onError: (error) => {
      console.error('Error adding book:', error.cause.message)
      setShowError(true)
      setAddBookError(error.cause.message)
      setTimeout(() => {
        setShowError(false)
        setAddBookError(null)
      }, 5000)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, genres, published: parseInt(published) } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {showError && (
        <div>
          <p style={{ color: 'red' }}>
            Error: {addBookError}
          </p>
        </div>
      )}
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook