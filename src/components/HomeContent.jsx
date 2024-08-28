import { useLocation } from "react-router-dom";
import Card from "./Card";
import PageSelection from "./PageSelection";

function HomeContent(props) {
  const { data } = props;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  let offers = data.offers;
  let pageMax;
  if (limit) {
    offers = data.offers.slice((page - 1) * limit, limit * page);
    pageMax = Math.ceil(data.offers.length / limit);
  }
  return (
    <div className="content">
      {page && <PageSelection page={page} pageMax={pageMax} limit={limit} />}
      <div className="card-wrapper">
        {offers.map((offer) => {
          return <Card key={offer._id} offer={offer} />;
        })}
      </div>
      {page && <PageSelection page={page} pageMax={pageMax} limit={limit} />}
    </div>
  );
}

export default HomeContent;
