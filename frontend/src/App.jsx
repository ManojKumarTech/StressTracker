import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/login';
import Testing from './pages/Testing';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route  path="/home" element={<Home/>} />
      <Route path='/test' element={<Testing/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
