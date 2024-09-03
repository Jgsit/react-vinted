import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

function Signup({ setVisible, setToken }) {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    let { name, value, checked } = event.target;
    if (name === "newsletter") {
      value = checked;
    }
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in info) {
      formData.append(String(key), String(info[key]));
    }
    formData.append("avatar", avatar);
    try {
      const response = await axios.post(
        "https://site--vinted-backend--qff9cbxq7z2g.code.run/signup",
        formData
      );
      setToken(response.data.token);
      Cookies.set("token", response.data.token, { expires: 15 });

      setVisible([false, false]);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
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
        className="signup"
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
          <h2>S'inscrire</h2>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          />
          <label htmlFor="avatar">
            Ajoute un avatar :{" "}
            {avatar && (
              <img src={URL.createObjectURL(avatar)} alt="user avatar" />
            )}
          </label>
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
        <a onClick={() => setVisible([false, true])}>
          Tu as déjà un compte ? Connecte-toi
        </a>
      </div>
    </div>
  );
}
export default Signup;
