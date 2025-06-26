import { useRef } from 'react'
import Post from './Post/Post'
import Togglable from './Togglable'
import FormNewPost from './form-new-post/FormNewPost'
import blogService from '../services/blogs'
import Notification from './Notification/Notification'
import { useGetPosts, useCreatePost, useUpdatePost, useRemovePost } from '../hooks'
import { useUser } from '../hooks'

const Blog = () => {
  const { userLogged, clearUser } = useUser()
  const blogFormRef = useRef()
  const data = useGetPosts()
  const blog = data || []

  const { mutate: createPost } = useCreatePost()
  const { mutate: updatePost } = useUpdatePost()
  const { mutate: removePost } = useRemovePost()

  const handleCreatePost = async (newPost) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(userLogged.user.token)
    createPost(newPost)
  }

  const handleUpdatePost = async (newPost) => {
    blogService.setToken(userLogged.user.token)
    updatePost(newPost)
  }

  const handleRemovePost = async (id) => {
    blogService.setToken(userLogged.user.token)
    removePost(id)
  }

  return (
    <div data-testid="blog">
      <h2>Blogs</h2>
      <Notification />
      <p>{userLogged.username} logged in</p>
      <button
        data-testid="btnLogout"
        onClick={clearUser}>
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
          user={userLogged.user}
          updatePost={handleUpdatePost}
          removePost={handleRemovePost} />
      ))}
    </div>
  )
}

export default Blog