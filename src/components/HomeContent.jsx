import Card from "./Card";

function HomeContent(props) {
  const { data } = props;
  const offers = data.offers;
  return (
    <div className="content">
      <div className="card-wrapper">
        {offers.map((offer) => {
          return <Card key={offer._id} offer={offer} />;
        })}
      </div>
    </div>
  );
}

export default HomeContent;
