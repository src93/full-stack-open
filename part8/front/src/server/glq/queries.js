import { gql  } from '@apollo/client'
import { BOOK_DETAILS } from './fragments.js'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      numberOfBooks
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String) {
    booksByGenre(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`