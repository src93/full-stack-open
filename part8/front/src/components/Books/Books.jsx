import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../../server/glq/queries'
import { ALL_GENRES } from '../../server/glq/queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const allGenresResult = useQuery(ALL_GENRES)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    onError: (error) => {
      console.error('Error fetching books:', error.cause.result.errors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading || allGenresResult.loading) {
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
      {allGenresResult.data.allGenres.map((genre) => {
        return (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )
      })}
    </div>
  )
}

export default Books