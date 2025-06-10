import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    addPost(state, action) {
      state.push(action.payload)
    },
    updatePost(state, action) {
      const updatedPost = action.payload
      return state.map(post => post.id === updatedPost.id ? updatedPost : post)
    },
    removePost(state, action) {
      const id = action.payload
      return state.filter(post => post.id !== id)
    }
  }
})

export const {
  setBlog,
  addPost,
  updatePost: updatePostAction,
  removePost: removePostAction
} = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createPost = (newPost) => {
  return async (dispatch) => {
    const response = await blogService.create(newPost)
    dispatch(addPost(response))
  }
}

export const updatePost = (updatedPost) => {
  return async (dispatch) => {
    const response = await blogService.update(updatedPost)
    dispatch(updatePostAction(response))
  }
}

export const removePost = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removePostAction(id))
  }
}