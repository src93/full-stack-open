import Author from '../mongoose/models/author.js'
import Book from '../mongoose/models/book.js'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if (!args.author && !args.genre) {
        return books
      }

      return books.filter(book => {
        const authorMatch = !args.author || book.author.name === args.author
        const genreMatch = !args.genre || book.genres.includes(args.genre)
        return authorMatch && genreMatch
      })
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    numberOfBooks: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = null
      const existingBook = await Book.findOne({ title: args.title })
      if (existingBook) {
        throw new GraphQLError('Book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            message: 'Book already exists'
          }
        })
      }

      if (args.author.length <= 3) {
        throw new GraphQLError('Author name must be longer than 3 characters', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            message: 'Author name must be longer than 3 characters'
          }
        })
      }

      const authorExists = await Author.findOne({ name: args.author })
      if (!authorExists) {
        const newAuthor = new Author({
          name: args.author,
        })
        author = await newAuthor.save()
          .catch(error => {
            throw new GraphQLError('Failed to save author: ' + error.message, {
              extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                invalidArgs: args.author,
                message: 'Failed to save author'
              }
            })
          })
      } else {
        author = authorExists
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author.id
      })
      const bookSaved = await newBook.save(newBook)
      return bookSaved.populate('author')
    },
    editAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name })
      if (!authorExists) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'NOT_FOUND',
            invalidArgs: args.name,
            message: 'Author not found'
          }
        })
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true }
      ).catch(error => {
        throw new GraphQLError('Failed to update author: ' + error.message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            invalidArgs: args.name,
            message: 'Failed to update author'
          }
        })
      })
    }
  }
}