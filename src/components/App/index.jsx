//import { useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import HomePage from "components/HomePage";
import RestaurantPage from "components/RestaurantPage";
import CartPage from "components/CartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Button from 'components/Button';

function App() {
   return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rectaurant/:slug" element={<RestaurantPage />} />
                <Route path="/cart/:cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
