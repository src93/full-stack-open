import { gql  } from '@apollo/client'

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
      id
      born
      numberOfBooks
    }
    genres
  }
`