import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Webfont from 'webfontloader';
import React, { useEffect,useState } from 'react';
import Footer from './Components/Layout/Footer';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import Products from './Components/Product/Products';
import Search from './Components/Product/Search';
import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';
import store from "./Store"
import { LoadUser } from './Actions/UserAction';
import { useSelector } from 'react-redux';
import Useroptions from './Components/Layout/Speeddial';
import Loader from './Components/Loader/Loader';


function App() {

  const {isAuthenticated,user,loading}= useSelector((state) => state.User)
  
  useEffect(() => {
    Webfont.load({
      google: {
        families: [
          'Roboto:400,700',
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Raleway:400,700'
        ]
      }
    });
    store.dispatch(LoadUser())
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <Router>
      <Navbar />
      {isAuthenticated  && <Useroptions user={user}/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} /> 
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
