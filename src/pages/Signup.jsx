import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    let { name, value, checked } = event.target;
    if (name === "newsletter") {
      value = checked;
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };
  return (
    <main>
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="signup">S'inscrire</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            className="text"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            id="mail"
            placeholder="Email"
            className="text"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            className="text"
            onChange={handleChange}
            required
          />
          <span className="error">{message}</span>
          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                onChange={handleChange}
              />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <input type="submit" value="S'inscrire" />
        </form>
        <a href="/login">Tu as déjà un compte ? Connecte-toi</a>
      </div>
    </main>
  );
}
export default Signup;
