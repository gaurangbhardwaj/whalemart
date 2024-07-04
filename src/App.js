import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/shared/navbar.component";
import ErrorBoundary from "./errorBoundary";

import Login from "./components/guest/login/index";

const ProductList = lazy(() => import("./components/app/product-list/ProductList.component"));
const ProductDetails = lazy(() => import("./components/app/product-details/ProductDetails.component"));
const Cart = lazy(() => import("./components/app/cart/cart.component"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/products" Component={ProductList} />
            <Route path="/product/:id" Component={ProductDetails} />
            <Route path="/cart" Component={Cart} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
