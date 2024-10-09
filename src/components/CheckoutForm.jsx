import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment`,
      {
        title: title,
        amount: Number(price).toFixed(2),
      }
    );

    const clientSecret = response.data.client_secret;

    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
    }

    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (completed) {
      const delayDebounceFn = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [completed]);

  return completed ? (
    <div className="payment">
      <div className="done">
        <ul className="box">
          <li>Paimenet effectué</li>
          <li>Redirection ...</li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="payment">
      <div className="container">
        <div className="payment-box">
          <h2>Résumé de la commande</h2>
          <ul className="detail">
            <li>
              Commande <span>{price.toFixed(2)} €</span>
            </li>
            <li>
              Frais de protection acheteurs{" "}
              <span>{(price / 10).toFixed(2)} €</span>
            </li>
            <li>
              Frais de port <span>{(price / 5).toFixed(2)} €</span>
            </li>
          </ul>
          <ul>
            <li>
              Total<span>{((price * 13) / 10).toFixed(2)} €</span>{" "}
            </li>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span>{title}.</span> Vous allez payer{" "}
              <span>{((price * 13) / 10).toFixed(2)} €</span> (frais de
              protection et frais de port inclus).
            </p>
          </ul>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements || isLoading}>
              Pay
            </button>
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
