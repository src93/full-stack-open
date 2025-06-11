import { useRef } from 'react'
import Post from './Post/Post'
import Togglable from './Togglable'
import FormNewPost from './form-new-post/FormNewPost'
import blogService from '../services/blogs'
import Notification from './Notification/Notification'
import { useNotification } from '../hooks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ user, handleLogout }) => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()
  const blogFormRef = useRef()
  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
  const blog = data || []

  const { mutate: createPost } = useMutation({
    mutationFn: (newPost) => blogService.create(newPost),
    onSuccess: (createdPost) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => oldBlogs.concat(createdPost))
      setNotification({
        message: `A new blog ${createdPost.title} by ${createdPost.author} added`,
        typeMessage: 'success',
      })
    },
    onError: (error) => {
      setNotification({
        message: 'Error creating post',
        typeMessage: 'error',
      })
    }
  })

  const handleCreatePost = async (newPost) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    createPost(newPost)
  }

  const handleUpdatePost = async (newPost) => {
    try {
      blogService.setToken(user.token)
      const response = await blogService.update(newPost)
      // setBlog(blog.map(post => post.id !== newPost.id ? post : response))
      setNotification({
        message: `title: ${response.title} by ${response.author} updated`,
        typeMessage: 'success',
      })
    } catch (error) {
      setNotification({
        message: 'Error updating post',
        typeMessage: 'error',
      })
    }
  }

  const handleRemovePost = async (id) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(id)
      // setBlog(blog.filter(post => post.id !== id))
      setNotification({
        message: 'Post deleted',
        typeMessage: 'success',
      })
    } catch (error) {
      setNotification({
        message: 'Error deleting post',
        typeMessage: 'error',
      })
    }
  }

  return (
    <div data-testid="blog">
      <h2>Blogs</h2>
      <Notification />
      <p>{user.username} logged in</p>
      <button
        data-testid="btnLogout"
        onClick={handleLogout}>
        Logout
      </button>
      <br />
      <Togglable buttonLabel="Create new post" ref={blogFormRef}>
        <FormNewPost createNewPost={handleCreatePost} />
      </Togglable>
      {blog.sort((a, b) => b.likes - a.likes).map(post => (
        <Post
          key={post.id}
          post={post}
          user={user}
          updatePost={handleUpdatePost}
          removePost={handleRemovePost} />
      ))}
    </div>
  )
}

export default Blog