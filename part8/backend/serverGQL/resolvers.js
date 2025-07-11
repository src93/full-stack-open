import { v4 as uuid } from 'uuid'
import { authors, books } from './data.js'

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return books.filter(book => {
        const authorMatch = !args.author || book.author === args.author
        const genreMatch = !args.genre || book.genres.includes(args.genre)
        return authorMatch && genreMatch
      })
    },
    allAuthors: () => authors
  },
  Author: {
    numberOfBooks: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const existingBook = books.find(book => book.title === args.title && book.author === args.author)
      if (existingBook) {
        throw new Error('Book already exists')
      }

      const authorExists = authors.some(author => author.name === args.author)
      if (!authorExists) {
        const newAuthor = {
          name: args.author,
          id: uuid()
        }
        authors = authors.concat(newAuthor)
      }

      const newBook = {
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: args.author,
        id: uuid()
      }
      books = books.concat(newBook)
      return newBook
    },
    editAuthor: (root, args) => {
      const authorExists = authors.find(author => author.name === args.name)
      if (!authorExists) return null

      const updatedAuthor = {
        ...authorExists,
        born: args.setBornTo
      }
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
    }
  }
}