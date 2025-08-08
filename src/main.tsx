import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, } from 'react-router-dom';
import MyProvider from './ContextProvider/Provider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
        <MyProvider>
            <App />
        </MyProvider>

    </BrowserRouter>
  </StrictMode>,
)
