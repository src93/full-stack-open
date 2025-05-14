import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  console.log('response', response.data);
  return response.data;
}

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, {
    content: anecdote,
    votes: 0
  });
  return response.data;
}

export {
  getAnecdotes,
  createAnecdote
}