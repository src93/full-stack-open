const dummy = require('../utils/list-helper').dummy
const totalLikes = require('../utils/list-helper').totalLikes
const favoritePost = require('../utils/list-helper').favoritePost
const mostPost = require('../utils/list-helper').mostPost
const mostLikes = require('../utils/list-helper').mostLikes

const listWithOnePost = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const posts = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy return one', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  })

  test('When list has only one post equal the likes of that', () => {
    const result = totalLikes(listWithOnePost)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(posts)
    expect(result).toBe(36)
  })
})

describe('favorite post', () => {
  test('of empty list is zero', () => {
    const result = favoritePost([]);
    expect(result).toEqual(null);
  })

  test('When list has only one post equal the likes of that', () => {
    const result = favoritePost(listWithOnePost)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = favoritePost(posts)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

describe('most post', () => {
  test('of empty list is zero', () => {
    const result = mostPost([]);
    expect(result).toEqual(null);
  })

  test('When list has only one post equal the likes of that', () => {
    const result = mostPost(listWithOnePost)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      posts: 1,
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = mostPost(posts)
    expect(result).toEqual({
      author: "Robert C. Martin",
      posts: 3,
    })
  })
})

describe('most likes', () => {
  test('of empty list is zero', () => {
    const result = mostLikes([]);
    expect(result).toEqual(null);
  })

  test('When list has only one post equal the likes of that', () => {
    const result = mostLikes(listWithOnePost)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = mostLikes(posts)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})