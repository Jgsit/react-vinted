import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";

function Header(props) {
  const { token, setToken } = props;
  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Recherche des articles" />
      </div>
      {token ? (
        <div className="connected">
          <button
            onClick={() => {
              setToken(null);
              Cookies.remove("token");
            }}
          >
            Se deconnecter
          </button>
        </div>
      ) : (
        <div className="connect">
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      )}

      <button className="sold">Vends tes articles</button>
    </header>
  );
}

export default Header;
