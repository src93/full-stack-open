import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../../server/glq/queries'
import { ALL_BOOKS } from '../../server/glq/queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const allBooksResult = useQuery(ALL_BOOKS)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('Error fetching books:', error.cause.result.errors[0].message)
    }
  })

  useEffect(() => {
    if (allBooksResult.data && allBooksResult.data.allBooks) {
      const allGenres = new Set()
      allBooksResult.data.allBooks.forEach(book => {
        book.genres.forEach(genre => allGenres.add(genre))
      })
      setGenres(Array.from(allGenres))
    }
  }, [allBooksResult])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    console.error('Error fetching books:', result.error.cause.result.errors[0].message)
    return <div>Error: {result.error.message}</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>In genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
        return (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )
      })}
    </div>
  )
}

export default Books