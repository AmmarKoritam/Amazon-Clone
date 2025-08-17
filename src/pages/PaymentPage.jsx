// Library
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import Header from "../components/Header";
import Payment from "../components/Payment";

const stripePromise = loadStripe(
  "pk_test_51RkHrABXX6bbwLyBlHWyz7e4PSnfauM962MtALArOzVCmIfb8fAZ4aPATnZpJ3KnRKy6ROd8iBDStRu4R7u9Bux500EZsaEVqW"
);

function PaymentPage() {
  return (
    <>
      <Header />
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </>
  );
}

export default PaymentPage;
