import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { Range } from "react-range";
import { useState } from "react";

function Header(props) {
  const {
    token,
    setToken,
    visible,
    setVisible,
    setTitle,
    setPriceRange,
    setSort,
    priceRange,
  } = props;
  const [values, setValues] = useState(0);

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Recherche des articles"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Range
          step={1}
          min={0}
          max={100000}
          values={priceRange}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "#ccc",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <input
          type="checkbox"
          id=""
          onChange={() =>
            setSort((prevState) =>
              prevState === "price-asc" ? "price-desc" : "price-asc"
            )
          }
        />
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
          <button
            onClick={() => {
              const newVisible = [...visible];
              newVisible[0] = !newVisible[0];
              setVisible(newVisible);
            }}
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              const newVisible = [...visible];
              newVisible[1] = !newVisible[1];
              setVisible(newVisible);
            }}
          >
            Se connecter
          </button>
        </div>
      )}

      <button className="sold">Vends tes articles</button>
    </header>
  );
}

export default Header;
