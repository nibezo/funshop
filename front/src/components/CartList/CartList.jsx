import { useEffect, useState } from "react";
import axios from "axios";
import "./CartList.scss";

export default function CartList() {
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    axios
      .get("https://funapi.ilyadev.tech/carts", {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add "Bearer" before token
        },
      })
      .then((res) => {
        const data = [];
        for (const element of Object.keys(res.data)) {
          data.push({ element: res.data[element] });
        }
        setCartList(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=".cart-list">
      <h2>Cart List</h2>
      <ul>
        {cartList.map((item, index) => (
          <li key={index}>
            <p>Name: {item[0].name}</p>
            <p>Price: {item[0].price}</p>
            <p>Quantity: {item[0].quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
