import Card from "./Card";
import PageSelection from "./PageSelection";

function HomeContent(props) {
  const { data, page, pageMax, limit } = props;
  return (
    <div className="content">
      {page && <PageSelection page={page} pageMax={pageMax} limit={limit} />}
      <div className="card-wrapper">
        {data.offers.slice((page - 1) * limit, limit * page).map((offer) => {
          return <Card key={offer._id} offer={offer} />;
        })}
      </div>
      {page && <PageSelection page={page} pageMax={pageMax} limit={limit} />}
    </div>
  );
}

export default HomeContent;
