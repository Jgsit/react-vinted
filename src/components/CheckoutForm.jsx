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
      "https://site--vinted-backend--qff9cbxq7z2g.code.run/payment",
      {
        title: title,
        amount: Number(price).toFixed(2),
      }
    );

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements,
      clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirections
      redirect: "if_required",
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // On a fini de charger
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
            {/* Éventuel message d'erreur */}
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
