import "./Main.scss";

import { useState } from "react";

import Bar from "../Bar/Bar";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import UpdateCart from "../UpdateCart/UpdateCart";

export default function Main({ setLogin }) {
  const [tab, setTab] = useState("Shop");
  return (
    <>
      <h1>Fun Shop</h1>
      <Bar setLogin={setLogin} setTab={setTab} />
      {tab === "Shop" && <Shop />}
      {tab === "Cart" && <Cart setTab={setTab} />}
      {tab === "UpdateCart" && <UpdateCart />}
    </>
  );
}
