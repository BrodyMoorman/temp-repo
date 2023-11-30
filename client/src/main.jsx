import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'

ReactDOM.createRoot(document.getElementById('root')).render(

    <ChakraProvider>
       <AuthProvider
                  authType = {'cookie'}
                  authName={'__auth__'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  ,
)
