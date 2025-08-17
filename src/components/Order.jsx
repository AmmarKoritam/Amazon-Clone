// Library
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";

import CheckoutProduct from "./CheckoutProduct";

import "./Order.css";

function Order({ order }) {
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
          <h3 className="order-total">Order Total : {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount * 10}
        displayType="text"
        prefix="$"
        thousandSeparator=","
      />
    </div>
  );
}

export default Order;
