const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initUser = {
  username: 'sergio',
  name: 'Superuser',
  password: 'password'
}

const initBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

const insertUser = async () => {
  console.log('entra en insertUser')
  // const users = await User.find({})
  // console.log('users', users)
  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(initUser.password, saltRounds)
  console.log('passwordHash', passwordHash)
  const userDB = new User({
    username: initUser.username,
    name: initUser.name,
    passwordHash
  })
  console.log('userDB', userDB)
  try {
    console.log('try')
    const response = await userDB.save()
    console.log('sale en insertUser')
    return response.toJSON()
  } catch (error) {
    console.log('error', error)
    return error
  }
}

const initialBlog = async () => {
  console.log('entra en initialBlog')
  return await Blog.insertMany(initBlogs)
}

const postsInDB = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  initialBlog,
  postsInDB,
  insertUser,
  initUser,
  initBlogs
}