import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '../store/store.ts'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import About from './About.tsx'
import Data from './Data.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App/>} />
      <Route path='about' element={<About/>} />
      <Route path='data' element={<Data/>} />
    </>
  )
)

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
