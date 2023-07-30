import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

// OrdersPage component
export default function OrdersPage() {
  // State to store the orders fetched from the API
  const [orders, setOrders] = useState([]);

  // useEffect hook to fetch orders data from the API on component mount
  useEffect(() => {
    // Make a GET request to the '/api/orders' endpoint to fetch orders data
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  // Return the JSX elements inside the 'Layout' component
  return (
    <Layout>
      <h1>Commandes</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Payé</th>
            <th>Destinataire</th>
            <th>produits</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "OUI" : "NON"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
