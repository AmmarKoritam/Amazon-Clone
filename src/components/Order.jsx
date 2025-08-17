// Library
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";
import CheckoutProduct from "./CheckoutProduct";
import "./Order.css";

function Order({ order }) {
  const totalItems = order.data.basket?.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{format(new Date(order.data.created * 1000), "MMMM dd yyyy h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>

      {order.data.basket?.map((item) => (
        <CheckoutProduct key={item.id} item={item} hiddenBnt />
      ))}

      <NumericFormat
        renderText={(value) => (
          <h3 className="order-total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType="text"
        prefix="$"
        thousandSeparator=","
      />

      <div>
        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>
    </div>
  );
}

export default Order;
