import { useAuth } from "../context/GlobleState";

import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal";
import EmptyBasket from "./EmptyBasket";

import imageAd from "../image/checkoutAd.jpg";

import "./Checkout.css";

function Checkout() {
  const { user, basket, dispatch } = useAuth();

  function handleClearItems() {
    if (window.confirm("Are you sure you want to clear the basket?")) {
      dispatch({ type: "clear/items" });
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={imageAd} alt="Ad banner" />
        <h3>Hello, {user?.email || "Guest"}</h3>
        <h2 className="checkout-title">Your Shopping Basket</h2>

        {basket.length === 0 ? (
          <EmptyBasket />
        ) : (
          <>
            {basket.map((item) => (
              <CheckoutProduct item={item} key={item.id} />
            ))}
            <button className="clear-items" onClick={handleClearItems}>
              Clear items
            </button>
          </>
        )}
      </div>

      <div className="checkout-right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
