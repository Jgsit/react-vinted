import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Puy6c187wKElnh7zdX7MzPJxjQysIhh5tPFIV8jHPJQhuHaI07Z4l7AnasCtXcp3qj84ULG5qIcTA5xW94TQGYs0091Jqk7CI"
);

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
    <div className="payment">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </div>
  ) : (
    (setVisible([false, true]), navigate("/"))
  );
}

export default Payment;
