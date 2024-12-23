
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'

import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'



function App() {


  return (
    <div  className="flex flex-col min-h-screen bg-cyan-700 font-sans antialiased">
      <Header/>
      <main  className="flex-grow container mx-auto py-6 pb-24">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
