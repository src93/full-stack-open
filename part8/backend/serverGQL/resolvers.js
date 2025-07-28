import Author from '../mongoose/models/author.js'
import Book from '../mongoose/models/book.js'

export const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      console.log('Books:', books)
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
      const books = await Book.find({})
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = null
      const existingBook = await Book.findOne({ title: args.title })
      if (existingBook) {
        throw new Error('Book already exists')
      }

      const authorExists = await Author.findOne({ name: args.author })
      if (!authorExists) {
        const newAuthor = new Author({
          name: args.author,
        })
        author = await newAuthor.save()
          .catch(error => {
            throw new Error('Failed to create author: ' + error.message)
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
      if (!authorExists) return null

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true }
      ).catch(error => {
        throw new Error('Failed to update author: ' + error.message)
      })
    }
  }
}