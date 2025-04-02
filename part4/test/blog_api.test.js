const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper.test')

const Blog = require('../models/blog')


describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
    console.log('Data is inserted')
  })

  test('Blog are returned as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    // assert.ok(true)
    console.log('Blog are returned as json')
  })

  test('There are six post', async () => {
    const response = await api.get('/api/blog')

    assert.strictEqual(response.body.length, helper.initialBlog.length)
    // assert.ok(true)
    console.log('There are six post')
    // expect(response.body).toHaveLength(helper.initialBlog.length)
  })

  test('the post has the param id and not _id', async () => {
    const response = await api.get('/api/blog')
    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)

    // expect(response.body[0].id).toBeDefined()
    // expect(response.body[0]._id).not.toBeDefined()
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

  test('if title or url is missing it will return 400', async () => {
    const blogWithoutTitle = {
      author: 'Austin',
      url: 'http://www.austin.com',
    }
    const blogWithoutUrl = {
      title: 'new blog',
      author: 'Austin',
    }
    await api
      .post('/api/blog')
      .send(blogWithoutTitle)
      .expect(400)

    await api
      .post('/api/blog')
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('delete a post', async () => {
    const blog = await helper.initialBlog
    const { _id } = blog[0]
    await api
      .delete(`/api/blog/${_id}`)
      .expect(204)
  })

  test('update a post', async () => {
    const blog = helper.initialBlog
    const { _id } = blog[0]
    const newBlog = {
      title: 'new blog',
      author: 'oher author'
    }
    const response = await api
      .put(`/api/blog/${_id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const { body } = response

    assert.strictEqual(body.title, newBlog.title)
    assert.strictEqual(body.author, newBlog.author)
  })

  after(async () => {
    console.log('enter after')
    await Blog.deleteMany({})
    await mongoose.connection.close()
    console.log('Data is deleted')
  })
})