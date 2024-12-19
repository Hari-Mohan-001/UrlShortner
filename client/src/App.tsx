
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'



function App() {


  return (
    <div>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
