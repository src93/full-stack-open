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

module.exports = router