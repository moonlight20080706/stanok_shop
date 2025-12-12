import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Provider from './context/useContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider>
    <App />
    <Toaster />
  </Provider>
  </BrowserRouter>,
)
