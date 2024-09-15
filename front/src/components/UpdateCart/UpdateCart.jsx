import "./UpdateCart.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Update() {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState(null);

  function updateCart() {}
  return (
    <div className="update">
      <h2 style={{ textAlign: "center" }}>
        Enter cart's id and edit it (or remove)
      </h2>
      <div className="update__form">
        <input type="number" className="update__input" placeholder="Cart ID" />
        <button className="update__button" onClick={updateCart}>
          Enter
        </button>
      </div>
    </div>
  );
}
