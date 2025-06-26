import { useState, useContext, useCallback } from 'react'
import NotificationContext from '../context/NotificationContext.jsx'
import UserContext from '../context/UserContext.jsx'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs.js'

export const useFiled = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    name,
    reset,
    onChange
  }
}

export const useNotification = () => {
  const { notification, notificationDispath } = useContext(NotificationContext)

  const setNotification = ({message, typeMessage, timeout = 5000}) => {
    if (notification.timeoutId) {
      clearTimeout(notification.timeoutId)
    }
    const timeoutId = setTimeout(() => {
      notificationDispath({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)

    notificationDispath({
      type: 'SET_NOTIFICATION',
      payload: { message, typeMessage, timeoutId }
    })
  }

  return {
    ...notification,
    setNotification
  }
}

export const useUser = () => {
  const { user: userContext, userDispatch } = useContext(UserContext)
  const setUser = useCallback((user) => {
    userDispatch({ type: 'SET_USER', payload: user })
  }, [userDispatch])
  const clearUser = () => {
    userDispatch({ type: 'CLEAR_USER' })
    window.localStorage.removeItem('loggedUser')
  }
  return {
    userContext,
    setUser,
    clearUser
  }
}

export const useGetPosts = () => {
  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
  return data || []
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
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
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: (updatedPost) => blogService.update(updatedPost),
    onSuccess: (response) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map(post => post.id !== response.id ? post : response)
      )
      setNotification({
        message: `title: ${response.title} by ${response.author} updated`,
        typeMessage: 'success',
      })
    },
    onError: () => {
      setNotification({
        message: 'Error updating post',
        typeMessage: 'error',
      })
    }
  })
}

export const useRemovePost = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.filter(post => post.id !== id)
      )
      setNotification({
        message: 'Post deleted',
        typeMessage: 'success',
      })
    },
    onError: () => {
      setNotification({
        message: 'Error deleting post',
        typeMessage: 'error',
      })
    }
  })
}