import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './context/UserContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
)
