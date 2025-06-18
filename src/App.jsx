import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DefaultLayout from '../layout/DefaultLayout'
import Homepage from '../pages/Homepage'
import SearchPage from '../pages/SearchPage'
import DetailsPage from '../pages/DetailsPage'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<DetailsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* 404 not found page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
