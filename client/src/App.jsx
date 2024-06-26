import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import About from './pages/About'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Header from './components/Header'
import PrivateRoutes from './components/PrivateRoutes'

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-out' element={<Signout />} />
      <Route path='/about' element={<About />} />
      <Route element={<PrivateRoutes />}>
      <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/sign-up' element={<Signup />}/>

      
    </Routes>
  </BrowserRouter>
}
