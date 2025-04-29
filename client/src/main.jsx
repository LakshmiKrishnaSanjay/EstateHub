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

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const root = createRoot(document.getElementById('root')); // ✅ Assign to root

root.render(
  <Provider store={store}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
        <ToastContainer />  {/* Add ToastContainer here */}
      </QueryClientProvider>
    </StrictMode>
  </Provider>
);


