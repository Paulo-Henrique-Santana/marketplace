import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header/Index";
import Provider from "./context/Provider";
import RouterLogin from "./pages/Login/RouterLogin";
import Sales from "./pages/Sales/Index";
import Product from "./pages/Product/Index";
import Home from "./pages/Home/HomePage/Home";

import "./styles/Global.scss";
import Categories from "./context/Categories";

const App = () => {
  return (
    <BrowserRouter>
      <Provider>
        {/* <Categories> */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<RouterLogin />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="product/:id" element={<Product />} />
          </Routes>
        {/* </Categories> */}
      </Provider>
    </BrowserRouter>
  );
};

export default App;
