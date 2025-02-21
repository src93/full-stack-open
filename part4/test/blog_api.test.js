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
})

after(async () => {
  await mongoose.connection.close()
})