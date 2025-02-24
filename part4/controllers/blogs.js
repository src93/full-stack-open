const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response, next) => {
  try {
    const blog = await Blog.find({})
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

  const { title, author, url, likes } = body
  const blog = new Blog({
    title,
    author,
    url,
    likes
  })
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  console.log('id en el delete', request.params)
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router