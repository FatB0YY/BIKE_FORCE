import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const store = setupStore()
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
