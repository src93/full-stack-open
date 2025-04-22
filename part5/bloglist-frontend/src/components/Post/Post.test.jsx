import { render, screen } from '@testing-library/react'
import Post from './Post'
import { beforeEach, describe, expect } from 'vitest'

describe('Test Post component', () => {
  beforeEach(() => {
    const post = {
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.com',
      likes: 0,
      user: {
        id: '123',
        name: 'Test user',
      }
    }

    render(<Post post={post} updatePost={() => {}} removePost={() => {}} />)
  })

  test('renders content', () => {
    const contentPost = screen.getByTestId('content-post')
    expect(contentPost).toBeInTheDocument()
  })

  test('renders title and author', () => {
    const postTitle = screen.getByTestId('postTitle')
    const postAuthor = screen.getByTestId('postAuthor')
    expect(postTitle).toHaveTextContent('Test title')
    expect(postAuthor).toHaveTextContent('Test author')
  })
})