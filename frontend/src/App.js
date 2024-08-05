import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import Navbar from './Components/Layout/Navbar';
import Webfont from "webfontloader"
import React,{useEffect} from 'react';
import Footer from './Components/Layout/Footer';
import Home from "./Components/Home"


function App() {

  useEffect(() => {
    Webfont.load({
      google: {
        families: [
          'Roboto:400,700', // Regular and Bold
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Raleway:400,700'
        ]
      }
    });
  }, []);

  return (
  <Router>
    <Navbar/>
    <Routes>
    <Route  path='/' element={<Home/>}/>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
