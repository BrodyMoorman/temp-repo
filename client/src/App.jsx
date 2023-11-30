import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PetPage from './pages/PetPage'
import {RequireAuth} from 'react-auth-kit'
import MyListingsPage from './pages/MyListingsPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<RequireAuth loginPath='/login'><Dashboard/></RequireAuth>} />
      <Route path="/pets/:id" element={<RequireAuth loginPath='/login'><PetPage/></RequireAuth>} />
      <Route path="/mylistings" element={<RequireAuth loginPath='/login'> <MyListingsPage/> </RequireAuth>} />
    </Routes>
  )
}

export default App
