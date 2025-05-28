import { useContext } from 'react'
import AnecdoteContext from './Context'

export const useAnecdoteValue = () => {
	const context = useContext(AnecdoteContext)
	return context.notification
}

export const useCreateAnecdote = () => {
	const context = useContext(AnecdoteContext)
	return context.createAnecdote
}

export const useVoteAnecdote = () => {
	const context = useContext(AnecdoteContext)
	return context.voteAnecdote
}