import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Index";
import RouterLogin from "./pages/Login/RouterLogin";
import Sales from "./pages/Sales/Index";
import Product from "./pages/Product/Index";
import Home from "./pages/Home/HomePage/Index";
import Favorites from "./pages/Favorites/Index";
import Cart from "./pages/Cart/Index";
import { LocalStorageProvider } from "./Context/LocalStorageContext";
import { CategoryProvider } from "./Context/CategoryContext";

import "./styles/Global.scss";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
    <BrowserRouter>
      <CategoryProvider>
        <LocalStorageProvider>
          <Header useFilters={[filters, setFilters]} />
          <Routes>
            <Route
              path="/"
              element={<Home useFilters={[filters, setFilters]} />}
            />
            <Route path="login/*" element={<RouterLogin />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </LocalStorageProvider>
      </CategoryProvider>
    </BrowserRouter>
  );
};

export default App;
