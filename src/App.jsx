import "./App.scss";
// Je renomme BrowserRouter en Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Composants
import Header from "./components/Header";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [visible, setVisible] = useState([false, false]);
  const [token, setToken] = useState(Cookies.get("token") || undefined);
  const [title, setTitle] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sort, setSort] = useState("price-asc");
  const [from, setFrom] = useState("");

  useEffect(() => {
    if (visible[0] || visible[1]) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        visible={visible}
        setVisible={setVisible}
        setTitle={setTitle}
        setPriceRange={setPriceRange}
        setSort={setSort}
        priceRange={priceRange}
        sort={sort}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              priceRange={priceRange}
              sort={sort}
              setVisible={setVisible}
              setFrom={setFrom}
            />
          }
        />
        <Route path="/offers/:id" element={<Offers />} />
        <Route path="/publish" element={<Publish setVisible={setVisible} />} />
        <Route path="/payment" element={<Payment setVisible={setVisible} />} />
      </Routes>

      {visible[0] && (
        <Signup setVisible={setVisible} visible={visible} setToken={setToken} />
      )}
      {visible[1] && (
        <Login
          token={token}
          setToken={setToken}
          setVisible={setVisible}
          visible={visible[1]}
          from={from}
        />
      )}
    </Router>
  );
}

export default App;
