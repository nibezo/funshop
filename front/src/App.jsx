import { useState } from "react";

import "./App.scss";
import Login from "./components/Login/Login";

import Bar from "./components/Bar/Bar";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import UpdateCart from "./components/UpdateCart/UpdateCart";

function Main({ setLogin }) {
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

function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      {!login && <Login setLogin={setLogin} />}
      {login && <Main setLogin={setLogin} />}
    </>
  );
}
{
}
export default App;
