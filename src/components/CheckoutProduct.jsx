import StarRating from "./StartRating";
import { useAuth } from "../context/GlobleState";
import "./CheckoutProduct.css";

function CheckoutProduct({ item, hiddenBnt }) {
  const { image, title, pricing, id } = item;
  const { dispatch } = useAuth();

  function handleDeleteItem() {
    dispatch({ type: "delete/item", payload: id });
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} alt="image" />

      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <small>$</small>
          <strong>{pricing}</strong>
        </p>
        <div className="checkoutProduct-rating">
          <StarRating maxRating={5} size={32} color="#131921" />
        </div>
        {!hiddenBnt && (
          <button onClick={handleDeleteItem}>Remove from Basket</button>
        )}{" "}
      </div>
    </div>
  );
}

export default CheckoutProduct;
