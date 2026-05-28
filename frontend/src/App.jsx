import React, { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import LoginSignup from './pages/LoginSignup/LoginSignup'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <LoginSignup onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <div className='app'>
        <Navbar onLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
