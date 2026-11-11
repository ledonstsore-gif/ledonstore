import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'
import BestSeller from './pages/BestSeller'
import TrackOrders from './pages/TrackOrders'
import Account from './pages/Account'
import Cart from './pages/Cart'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/best-seller" element={<BestSeller />} />
          <Route path="/track-orders" element={<TrackOrders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
