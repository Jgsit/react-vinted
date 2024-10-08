import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

function Login(props) {
  const { token, setToken, setVisible, from } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData
      );
      setToken(response.data.token);
      Cookies.set("token", response.data.token, { expires: 15 });
      setVisible([false, false]);
      if (from === "publish") {
        navigate("/publish");
      }
    } catch (error) {
      console.error(error);
      error.response.data.error && setMessage(error.response.data.error);
      error.response.data.message && setMessage(error.response.data.message);
    }
  };
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible([false, false]);
      }}
    >
      <div
        className="login"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <IoIosClose
          className="close"
          onClick={() => {
            setVisible([false, false]);
          }}
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="login">Se connecter</label>
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
          <input type="submit" value="S'inscrire" />
        </form>
      </div>
    </div>
  );
}
export default Login;
