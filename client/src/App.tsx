
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'

import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Auth from './pages/Auth'



function App() {


  return (
    <div  className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Header/>
      <main  className="flex-grow container mx-auto py-6 pb-24">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
