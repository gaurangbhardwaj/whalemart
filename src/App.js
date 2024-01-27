import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Container } from "@mui/material";

import Navbar from "./components/shared/navbar";
import ErrorBoundary from "./errorBoundary";

const ProductList = lazy(() => import("./components/app/productList"));
const ProductDetails = lazy(() => import("./components/app/productDetails"));
const Cart = lazy(() => import("./components/app/cart"));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={ProductList} />
            <Route path="/product/:id" Component={ProductDetails} />
            <Route path="/cart" Component={Cart} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
