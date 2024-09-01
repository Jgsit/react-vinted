import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { Range, getTrackBackground } from "react-range";
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
    sort,
  } = props;
  const [values, setValues] = useState([10, 100]);

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
      </div>
      <div className="search-params">
        <div className="search-bar">
          {" "}
          <input
            type="text"
            placeholder="Recherche des articles"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="sub-search">
          <div className="search-sort">
            <span>
              Trier par :{" "}
              {sort === "price-asc" ? "Prix croissant" : "Prix décroissant"}
            </span>
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
          <div className="range">
            {" "}
            <Range
              step={5}
              min={10}
              max={500}
              values={values}
              onChange={(values) => setValues(values)}
              onFinalChange={(values) => {
                setPriceRange(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "90%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: values,
                        colors: ["#ccc", " #2cb1ba", "#ccc"],
                        min: "10",
                        max: "500",
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ index, props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "15px",
                    width: "15px",
                    borderRadius: "50%",
                    border: isDragged ? "" : "1px solid white",
                    backgroundColor: "#2cb1ba",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "Maison Neue",
                      padding: "4px",
                      borderRadius: "4px",
                      backgroundColor: "#2cb1ba",
                    }}
                  >
                    {values[index]}€
                  </div>
                </div>
              )}
            />
          </div>
        </div>
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
