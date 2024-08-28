import { useState, useEffect } from "react";
import axios from "axios";
import HomeContent from "../components/HomeContent";
import tear from "../assets/tear.svg";

function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="app">
      <div className="hero">
        <div className="container">
          <img src={tear} alt="" />
          <div>
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <HomeContent data={data} />
    </div>
  );
}

export default Home;
