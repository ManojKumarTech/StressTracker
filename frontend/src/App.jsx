import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/login';
import Testing from './pages/Test/Testing';
import QuestionsPage from './pages/Test/QuestionsPage';
import ResultPage from './pages/Test/ResultPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route  path="/home" element={<Home/>} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/questions/:ageGroup" element={<QuestionsPage />} />
      <Route path='/result' element={<ResultPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
