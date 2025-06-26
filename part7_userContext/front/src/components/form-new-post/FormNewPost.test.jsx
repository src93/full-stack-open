import {  render, screen } from '@testing-library/react';
import FormNewPost from './FormNewPost';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';

describe('Test FormNewPost component', () => {
  let mockerCreateNewPost = vi.fn()
  beforeEach(() => {
    render(<FormNewPost createNewPost={mockerCreateNewPost} />)
  })

  test('renders content', () => {
    const formNewPost = screen.getByTestId('formNewPost')
    expect(formNewPost).toBeInTheDocument()
  })

  test('creates a new post', async () => {
    const inputTitle = screen.getByTestId('inputTitle')
    const inputAuthor = screen.getByTestId('inputAuthor')
    const inputUrl = screen.getByTestId('inputUrl')
    const btnCreate = screen.getByTestId('btnCreate')
    const user = userEvent.setup()
    await user.type(inputTitle, 'Test title')
    await user.type(inputAuthor, 'Test author')
    await user.type(inputUrl, 'http://test.com')
    await user.click(btnCreate)
    expect(mockerCreateNewPost.mock.calls).toHaveLength(1)
    expect(mockerCreateNewPost.mock.calls[0][0].title).toBe('Test title')
    expect(mockerCreateNewPost.mock.calls[0][0].author).toBe('Test author')
    expect(mockerCreateNewPost.mock.calls[0][0].url).toBe('http://test.com')
  })
})