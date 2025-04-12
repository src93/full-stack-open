const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response, next) => {
  try {
    const blog = await Blog.find({}).populate('user')
    return response.json(blog)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  const { body } = request

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const token = request.token
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  const user = await User.findOne({ username: decodedToken.username })
  const { title, author, url, likes } = body
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (request, response, next) => {
  const { body } = request
  const { id } = request.params
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = router