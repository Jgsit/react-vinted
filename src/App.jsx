import "./App.scss";
// Je renomme BrowserRouter en Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Composants
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || undefined);

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
