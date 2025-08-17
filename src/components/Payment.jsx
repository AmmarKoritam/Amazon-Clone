// Library
import { useEffect, useState } from "react";
import axios from "./axios";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { NumericFormat } from "react-number-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { getTotalPrice, useAuth } from "../context/GlobleState";
import CheckoutProduct from "./CheckoutProduct";
import { database } from "../firebase";
import "./Payment.css";

function Payment() {
  const { basket, user, dispatch } = useAuth();

  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const isWorking = disabled || succeeded || processing;

  useEffect(
    function () {
      async function getClientSecret() {
        const response = await axios({
          method: "post",
          url: `/payments/create?total=${getTotalPrice(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
        return response;
      }
      getClientSecret();
    },

    [basket]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const ref = doc(database, "users", user?.uid, "orders", paymentIntent.id);

      await setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate("/orders", { replace: true });
      dispatch({ type: "clear/items" });
    } catch (error) {
      console.error("Payment failed:", error);
      setError(error.message || "Something went wrong");
      setProcessing(false);
    }
  }

  function handleChange(e) {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>Checkout ({<Link to="/checkout">{basket.length} items</Link>})</h1>
        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Alexandria, Egypt</p>
          </div>
        </div>
        {/* Review Items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct item={item} key={item.id} hiddenBnt />
            ))}
          </div>
        </div>
        {/* Payment Method */}.
        <div className="payment-section">
          <h3>Payment Method</h3>

          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              {/* Stripe Card */}
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <NumericFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getTotalPrice(basket)}
                  displayType="text"
                  prefix="$"
                  thousandSeparator=","
                />
                <button type="submit" disabled={isWorking}>
                  <span>{processing ? "Processing..." : "Buy Now"}</span>
                </button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
