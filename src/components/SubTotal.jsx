// Library
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

import { getTotalPrice, useAuth } from "../context/GlobleState";
import "./Subtotal.css";

function SubTotal() {
  const { basket } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <NumericFormat
        renderText={(value) => (
          <p>
            Subtotal ({basket.length} items): <strong>{value}</strong>
          </p>
        )}
        decimalScale={2}
        value={getTotalPrice(basket)}
        displayType="text"
        thousandSeparator=","
        prefix="$"
      />

      <div className="subtotal__gift">
        <input type="checkbox" id="cheeked" />
        <label htmlFor="cheeked">This order contains a gift</label>
      </div>

      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default SubTotal;
