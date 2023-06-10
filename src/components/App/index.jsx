//import { useState } from "react";
import Footer from "components/Footer";
import HomePage from "components/HomePage";
import RestaurantPage from "components/RestaurantPage";
import ErrorPage from "components/Error/ErrorPage";
import CartPage from "components/CartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Button from 'components/Button';

function App() {
   return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/rectaurant/:slug" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
