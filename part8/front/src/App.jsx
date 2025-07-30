import { useState, useEffect } from 'react'
import Authors from './components/Authors/Authors'
import Books from './components/Books/Books'
import NewBook from './components/NewBook/NewBook'
import Recommendations from './components/Recommendations/Recommendations'
import { LOGIN } from './queries'
import { useMutation, useApolloClient } from '@apollo/client'


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setToken(null)
      console.error('Login error:', error)
    }
  })

  useEffect(() => {
    if (result.data && result.data.login) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setUsername('')
      setPassword('')
    }
  }, [result.data])

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  const homeView = () => {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />

        <Recommendations show={page === 'recommendations'} />
      </div>
    )
  }

  const loginView = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username" />
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password" />
          <button>login</button>
        </form>
      </>
    )
  }

  return (
    token ? homeView() : loginView()
  )
}

export default App