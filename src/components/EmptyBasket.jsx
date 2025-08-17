import { useNavigate } from "react-router-dom";
import "./EmptyBasket.css";

function EmptyBasket() {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <h3>
        There is no Product in the Cart, Please add some Product to the Cart
      </h3>
      <button onClick={() => navigate("/")}>Go to Product Page</button>
    </div>
  );
}

export default EmptyBasket;
