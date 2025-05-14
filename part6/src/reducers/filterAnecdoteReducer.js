const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.filter
    default:
      return state
  }
}

// ACTION CREATORS
export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER',
    payload: { filter }
  }
}

export default reducer