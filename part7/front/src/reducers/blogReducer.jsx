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
    }
  }
})

export const { setBlog, addPost } = blogSlice.actions
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