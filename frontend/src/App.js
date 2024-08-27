import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Webfont from 'webfontloader';
import React, { useEffect, useState } from 'react';
import Footer from './Components/Layout/Footer';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import Products from './Components/Product/Products';
import Search from './Components/Product/Search';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import store from "./Store";
import { LoadUser } from './Actions/UserAction';
import { useSelector } from 'react-redux';
import Useroptions from './Components/Layout/Speeddial';
import Loader from './Components/Loader/Loader';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import Profile from './Components/User/UserProfile';
import UpdateProfile from './Components/User/Updateprofile';
import UpdatePassword from './Components/User/updatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Components/payment/payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import MyOrders from './Components/Order/myOrders';
import OrderDetails from './Components/Order/orderDetails';
import Dashboard from './Components/Admin/Dashboard';
import ProductList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderList from './Components/Admin/OrderList';
import UpdateOrder from './Components/Admin/UpdateOrder';

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.User);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeKey() {
    const { data } = await axios.get("http://localhost:4000/api/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

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
    store.dispatch(LoadUser());
    getStripeKey();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Navbar />
      {isAuthenticated && <Useroptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/account' element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/updateProfile' element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/password/update' element={<UpdatePassword />} />
        </Route>
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/Cart' element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/shipping' element={<Shipping />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/order/confirm' element={<ConfirmOrder />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/success' element={<OrderSuccess />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/orders' element={<MyOrders />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/orders' element={<MyOrders />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/order/:id' element={<OrderDetails />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/products' element={<ProductList />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/newProduct' element={<NewProduct />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/orders' element={<OrderList />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/admin/order/:id' element={<UpdateOrder />} />
        </Route>

      </Routes>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path='/payment/process' element={<Payment />} />
          </Routes>
        </Elements>
      )}
      <Footer />
    </Router>
  );
}

export default App;
