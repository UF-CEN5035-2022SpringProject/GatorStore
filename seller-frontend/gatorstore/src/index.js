import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SellerStoreList from './pages/SellerStoreList'
import ProductPage from './pages/ProductPage'
import LandingPage from './pages/LandingPage'
import ProductList from './pages/ProductList';
import Testing from './pages/Testing'

ReactDOM.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/store-list" element={<SellerStoreList/>} />
      <Route path="/product-page" element={<ProductPage/>} />
      <Route path="/landingpage" element={<LandingPage/>} />
      <Route path="/productlist" element={<ProductList/>} />
      <Route path="/testing" element={<Testing/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

