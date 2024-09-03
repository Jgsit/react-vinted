import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferContent from "../components/OfferContent";

function Offers() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  const fetchData = async () => {
    const response = await axios
      .get(
        // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        `http://localhost:3000/offers/${id}`
      )
      .then(console.log(data));
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="body">
      <OfferContent data={data} />
    </div>
  );
}

export default Offers;
