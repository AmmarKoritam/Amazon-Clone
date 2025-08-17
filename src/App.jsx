// Library
import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
const AppLayout = lazy(() => import("./pages/AppLayout"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));

// Components
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { useAuth } from "./context/GlobleState";

import { auth } from "./firebase";

function App() {
  const { dispatch } = useAuth();

  useEffect(
    function () {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        dispatch({ type: "set/user", payload: user ?? null });
      });

      return () => unsubscribe();
    },
    [dispatch]
  );

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />

          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="payment" element={<PaymentPage />} />

          <Route path="orders" element={<OrdersPage />} />

          <Route path="login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
