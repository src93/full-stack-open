import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments.js'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
