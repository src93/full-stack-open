import { render, screen } from '@testing-library/react'
import Post from './Post'
import userEvent from '@testing-library/user-event'

describe('Test Post component', () => {
  let mockerUpdatePost = vi.fn()
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

    render(<Post post={post} updatePost={mockerUpdatePost} removePost={() => {}} />)
  })

  test('renders content', () => {
    const contentPost = screen.getByTestId('contentPost')
    expect(contentPost).toBeInTheDocument()
  })

  test('renders title and author', () => {
    const postTitle = screen.getByTestId('postTitle')
    const postAuthor = screen.getByTestId('postAuthor')
    expect(postTitle).toHaveTextContent('Test title')
    expect(postAuthor).toHaveTextContent('Test author')
  })

  test('renders url and likes when button is clicked', async () => {
    const btnView = screen.getByTestId('btnView')
    const user = userEvent.setup()
    await user.click(btnView)
    const postUrl = screen.getByTestId('postUrl')
    const postLikes = screen.getByTestId('postLikes')
    expect(postUrl).toHaveTextContent('http://test.com')
    expect(postLikes).toHaveTextContent('0 likes')
  })

  test('clicks the like button twice', async () => {
    const btnView = screen.getByTestId('btnView')
    const user = userEvent.setup()
    await user.click(btnView)
    const btnUpdateLikes = screen.getByTestId('btnLikes')
    await user.click(btnUpdateLikes)
    await user.click(btnUpdateLikes)
    expect(mockerUpdatePost.mock.calls).toHaveLength(2)
  })
})