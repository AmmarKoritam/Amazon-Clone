import { useAuth } from "../context/GlobleState";
import StarRating from "./StartRating";
import "./Product.css";

function Product({ id, title, image, pricing, quantity }) {
  const { dispatch } = useAuth();

  function handleAddItem(e) {
    e.preventDefault();

    dispatch({
      type: "add/item",
      payload: { id, title, image, pricing, quantity },
    });
  }

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{pricing}</strong>
        </p>
      </div>

      <div className="product-rating">
        <StarRating
          maxRating={5}
          size={32}
          message={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
        />
      </div>

      <img src={image} alt="product-image" />

      <button onClick={handleAddItem}>Add to Basket</button>
    </div>
  );
}

export default Product;
