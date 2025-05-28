import { useReducer, createContext } from 'react';

const anecdoteReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_ANECDOTE':
			return `Anecdote '${action.payload}' created!`
		case 'VOTE_ANECDOTE':
			return `Anecdote '${action.payload}' voted!`
		case 'CLEAR_NOTIFICATION':
			return ''
		default:
			return state
	}
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(anecdoteReducer, '')

	const createAnecdote = (content) => {
		notificationDispatch({ type: 'CREATE_ANECDOTE', payload: content })
		setTimeout(() => {
			notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
		}, 5000)
	}

	const voteAnecdote = (content) => {
		notificationDispatch({ type: 'VOTE_ANECDOTE', payload: content })
		setTimeout(() => {
			notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
		}, 5000)
	}

	return (
		<AnecdoteContext.Provider value={{ notification, createAnecdote, voteAnecdote }}>
			{children}
		</AnecdoteContext.Provider>
	)
}

export default AnecdoteContext