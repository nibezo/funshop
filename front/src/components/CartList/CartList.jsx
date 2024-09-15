import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartList.scss";

export default function CartList() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://funapi.ilyadev.tech/carts", {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add "Bearer" before token
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="cart-list">
      <h2>
        Cart List [<code style={{ color: "red" }}>!For devs</code>]&nbsp; |
        &nbsp;
        <button onClick={() => navigate("/main/Shop")}>I'm not a dev</button>
      </h2>
      <div>
        {Object.values(data).map((cart, index) => (
          <div key={index} className="cart-list__cart">
            <h4>Cart {index + 1}</h4>
            <code>{JSON.stringify(cart)}</code>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
