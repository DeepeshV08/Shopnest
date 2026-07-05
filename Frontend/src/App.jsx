import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Disclaimer from './pages/Disclaimer'
import Login from './pages/Login'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ReturnPolicy from './pages/ReturnPolicy'
import Shop from './pages/Shop'

// Admin Pages
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import AdminProducts from './admin/AdminProducts'
import AdminOrder from './admin/AdminOrder'
import EditProduct from './admin/EditProduct'
import AdminUsers from './admin/AdminUsers'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/users" element={<AdminUsers />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
