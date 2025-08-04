import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 

        <Routes>
          <Route path="/login" element={<Login type='SignIn' />} />
          <Route path='/signup' element = { <Login type='SignUp' />} />
          <Route path='*' element = {<App/>} />
        </Routes>

    </BrowserRouter>
  </StrictMode>,
)
