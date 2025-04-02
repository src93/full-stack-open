const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User API', () => {
  test('Add user valid', async () => {
    const newUser = {
      name: 'Austin',
      username: 'austin',
      password: 'password'
    }
    const response = await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = response
    assert.deepStrictEqual({
      name: newUser.name,
      username: newUser.username
    }, {
      name: body.name,
      username: body.username
    })
  })

  test('Add user invalid', async () => {
    const newUser = {
      name: 'Austin',
      username: 'austin',
      password: 'pa'
    }
    const anotherInvalidUser = {
      name: 'Austin',
      username: 'au',
      password: 'password'
    }
    await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
    await api
      .post('/api/user')
      .send(anotherInvalidUser)
      .expect(400)
  })

  after(() => {
    mongoose.connection.close()
  })
})
