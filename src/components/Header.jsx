import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
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
      <div className="connect">
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <button className="sold">Vends tes articles</button>
    </header>
  );
}

export default Header;
