import "./Bar.scss";

export default function Bar({ setLogin, setTab }) {
  return (
    <nav className="bar">
      <button className="bar__button" onClick={() => setTab("Shop")}>
        Shop🏬
      </button>
      <button className="bar__button" onClick={() => setTab("Cart")}>
        Cart🛒
      </button>
      <button className="bar__button" onClick={() => setTab("UpdateCart")}>
        Update a cart 🆔
      </button>
      <button className="bar__button" onClick={() => setLogin(false)}>
        Log out👋
      </button>
    </nav>
  );
}
