import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "../src/components/Header/Index";
import Provider from "./context/Provider";
import RouterLogin from "./pages/Login/RouterLogin";
import Sales from "./pages/Sales/Index";
import Product from "./pages/Product/Index";
import Home from "./pages/Home/HomePage/Home";

import "./styles/Global.scss";
import Categories from "./context/Categories";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
    <BrowserRouter>
      <Provider>
        <Header useFilters={[filters, setFilters]} />
        <Routes>
          <Route
            path="/"
            element={<Home useFilters={[filters, setFilters]} />}
          />
          <Route path="login/*" element={<RouterLogin />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="product/:id" element={<Product />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
