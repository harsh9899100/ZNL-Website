import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Styles/header-footer.css'
import './Styles/home-page.css'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify'; // for those atteractive alert messages
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>

    <React.StrictMode>
      <App />
      <ToastContainer theme="dark" />
    </React.StrictMode>
  </AuthProvider>
)
