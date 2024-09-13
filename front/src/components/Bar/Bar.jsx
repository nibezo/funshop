import "./Bar.scss";
import { useNavigate } from "react-router-dom";

export default function Bar({ count, price }) {
  const navigate = useNavigate();

  return (
    <nav className="bar">
      <button className="bar__button" onClick={() => navigate("Shop")}>
        Shop🏬
      </button>
      <button className="bar__button" onClick={() => navigate("Cart")}>
        Cart | Count {count} | Price {price}💎
      </button>
      <button className="bar__button" onClick={() => navigate("UpdateCart")}>
        Update a cart 🆔
      </button>
      <button className="bar__button" onClick={() => navigate("CartList")}>
        🛒
      </button>
      <button
        className="bar__button"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Log out👋
      </button>
    </nav>
  );
}
