import Author from '../mongoose/models/author.js'
import Book from '../mongoose/models/book.js'
import User from '../mongoose/models/user.js'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken';
import config from '../mongoose/config.js';

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
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            message: 'You must be logged in to access this resource'
          }
        })
      }
      return context.currentUser
    }
  },
  Author: {
    numberOfBooks: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
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
    },
    createUser: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username })
      if (existingUser) {
        throw new GraphQLError('Username already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            message: 'Username already exists'
          }
        })
      }

      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return newUser.save()
    },
    login: async (root, args) => {
      if (args.username.length < 3) {
        throw new GraphQLError('Username must be at least 3 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            message: 'Username must be at least 3 characters long'
          }
        })
      }
      if (args.password !== 'secret') {
        throw new GraphQLError('Invalid password', {
          extensions: {
            code: 'UNAUTHENTICATED',
            invalidArgs: args.password,
            message: 'Invalid password'
          }
        })
      }
      const user = await User.findOne({ username: args.username })
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
            invalidArgs: args.username,
            message: 'User not found'
          }
        })
      }
      const token = jwt.sign({
          username: user.username,
          id: user.id
        },
        config.JWT_SECRET
      )
      return { value: token }
    }
  }
}