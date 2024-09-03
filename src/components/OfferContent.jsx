import OfferInfo from "./OfferInfo";
import PicturesCarousel from "./PicturesCarousel";
import defaultAvatar from "../assets/default-avatar.png";
import { Link } from "react-router-dom";

function OfferContent(props) {
  const { data } = props;
  console.log(data);

  return (
    <main>
      <div className="container">
        <div className="offer-pictures">
          <PicturesCarousel data={data.product_pictures} />
        </div>
        <div className="offer-infos">
          <div className="offer-details">
            <span className="offer-price">
              {Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(data.product_price)}
            </span>
            <OfferInfo data={data.product_details} />
          </div>
          <div className="offer-content">
            <p className="offer-title">{data.product_name}</p>
            <p className="offer-description">{data.product_description}</p>
            <div className="user">
              {data.owner.account.avatar ? (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              ) : (
                <img src={defaultAvatar} alt="" />
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <Link
            to="/payment"
            state={{ title: data.product_name, price: data.product_price }}
          >
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OfferContent;
