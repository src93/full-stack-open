const dummy = require('../utils/list-helper').dummy

test('dummy return one', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})