import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import { AnecdoteContextProvider } from './Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AnecdoteContextProvider>
      <App />
    </AnecdoteContextProvider>
  </QueryClientProvider>
)