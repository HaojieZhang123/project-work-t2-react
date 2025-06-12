import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DefaultLayout from '../layout/DefaultLayout'
import Homepage from '../pages/Homepage'
import SearchPage from '../pages/SearchPage'
import DetailsPage from '../pages/DetailsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
