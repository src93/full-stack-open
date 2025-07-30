import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../queries'
import { ALL_BOOKS } from '../../queries'

const Recommendations = ({ show }) => {
  const [genre, setGenre] = useState('')
  const { data: user, error: errorUser, loading: loadingUser } = useQuery(GET_USER)
  const { data: booksData, error: errorBook, loading: loadingBook } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (user && user.me) {
      setGenre(user.me.favoriteGenre)
    }
  }, [user])

  if (!show) {
    return null
  }

  if (loadingUser || loadingBook) {
    return <div>Loading...</div>
  }
  if (errorUser) {
    console.error('Error fetching user:', errorUser.message)
    return <div>Error fetching user</div>
  }
  if (errorBook) {
    console.error('Error fetching books:', errorBook.message)
    return <div>Error fetching books</div>
  }

  return(
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksData.allBooks.filter(book => book.genres.includes(genre)).map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations