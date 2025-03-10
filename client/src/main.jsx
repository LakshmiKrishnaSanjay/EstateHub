import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

import { Provider } from 'react-redux'
import { store } from './redux/store.js'


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <StrictMode>

<QueryClientProvider client={queryClient}>

<App />
</QueryClientProvider>
   
  </StrictMode>
  </Provider>


)


