import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

function Payment({ setVisible }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price } = location.state;
  const token = Cookies.get("token");

  const options = {
    mode: "payment",
    amount: price,
    currency: "eur",
  };

  return token ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} price={(price * 13) / 10} />
    </Elements>
  ) : (
    (setVisible([false, true]), navigate("/"))
  );
}

export default Payment;
