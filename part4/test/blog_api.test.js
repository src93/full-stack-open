const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper.test')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlog)
})

describe('Blog API', () => {
  test('Blog are returned as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There are six post', async () => {
    const response = await api.get('/api/blog')

    assert.strictEqual(response.body.length, helper.initialBlog.length)
  })

  test('the post has the param id and not _id', async () => {
    const response = await api.get('/api/blog')
    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  })

  test('a valid post can be added', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Austin',
      url: 'http://www.austin.com',
      likes: 0
    }
    const response = await api
      .post('/api/blog')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = response
    assert.deepStrictEqual(newBlog, {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    const blogAfterPost = await helper.postsInDB()
    assert.strictEqual(blogAfterPost.length, helper.initialBlog.length + 1)
    assert.ok(blogAfterPost.some(blog => blog.id === body.id))
  })

  test('if likes is missing it will default to 0', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Austin',
      url: 'http://www.austin.com',
    }
    const response = await api
      .post('/api/blog')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const { body } = response
    assert.strictEqual(body.likes, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})