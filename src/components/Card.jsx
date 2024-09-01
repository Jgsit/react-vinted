import { Link } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.png";

function Card(props) {
  const { offer } = props;
  return (
    <div className="card-container">
      {offer.owner && (
        <div
          className="card-user"
          onClick={() => {
            alert("Go to user profile !");
          }}
        >
          {offer.owner.account.avatar ? (
            <img src={offer.owner.account.avatar.secure_url} alt="" />
          ) : (
            <img src={defaultAvatar} alt="" />
          )}
          <span>{offer.owner.account.username}</span>
        </div>
      )}
      <Link to={`/offers/${offer._id}`}>
        <div className="card-product">
          <img src={offer.product_image.secure_url} alt="" />
          <div className="card-infos">
            <span>
              {Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(offer.product_price)}
            </span>
            <span>{offer.product_details[1].TAILLE}</span>
            <span>{offer.product_details[0].MARQUE}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
