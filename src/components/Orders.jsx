// Library
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Order from "./Order";
import { useAuth } from "../context/GlobleState";
import { database } from "../firebase";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(
    function () {
      if (user) {
        const collRef = collection(database, "users", user?.uid, "orders");
        const orderedRef = query(collRef, orderBy("created", "desc"));
        onSnapshot(orderedRef, (querySnapshot) => {
          setOrders(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      } else {
        setOrders([]);
      }
    },
    [user]
  );

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
