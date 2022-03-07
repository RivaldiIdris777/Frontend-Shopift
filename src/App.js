import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer';

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails'

import Login from './components/user/Login';
import Register from './components/user/Register';

import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userAction'
import store from './store'
import axios from 'axios'

// Payment 
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {  
    store.dispatch(loadUser())    

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/search/:keyword" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetails/>} exact />

            <Route path="/cart" element={<Cart/>} exact />
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword/>} exact/>            
            <Route path="/password/reset/:token" element={<NewPassword/>} exact/>
            <Route path='/shipping' element={
              <ProtectedRoute>
                  <Shipping/>
              </ProtectedRoute>
            } />
            <Route path='/order/confirm' element={
              <ProtectedRoute>
                  <ConfirmOrder/>
              </ProtectedRoute>
            } />
            {stripeApiKey &&               
              <Route path='/payment' element={                
                  <Elements stripe={loadStripe(stripeApiKey)}>                    
                      <Payment/>                    
                  </Elements>                
              } />              
            }            
            <Route path='/me' element={
              <ProtectedRoute>
                  <Profile/>
              </ProtectedRoute>
            } />
            <Route path='/me/update' element={
              <ProtectedRoute>
                  <UpdateProfile/>
              </ProtectedRoute>
            } />
            <Route path='/password/update' element={
              <ProtectedRoute>
                  <UpdatePassword/>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
