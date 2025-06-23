import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// context
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// components
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import WishList from './pages/WishList'
import SummaryPage from './pages/SummaryPage'
import FinalPage from './pages/FinalPage'

function App() {

  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:slug" element={<DetailsPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="/final" element={<FinalPage />} />
                {/* 404 not found page */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </>
  )
}

export default App
