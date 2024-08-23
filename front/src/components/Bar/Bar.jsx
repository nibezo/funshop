import "./Bar.scss";
import { useNavigate } from "react-router-dom";

export default function Bar({ setTab }) {
  const navigate = useNavigate();
  return (
    <nav className="bar">
      <button className="bar__button" onClick={() => navigate("Shop")}>
        Shop🏬
      </button>
      <button className="bar__button" onClick={() => navigate("Cart")}>
        Cart🛒
      </button>
      <button className="bar__button" onClick={() => navigate("UpdateCart")}>
        Update a cart 🆔
      </button>
      <button className="bar__button" onClick={() => navigate("/")}>
        Log out👋
      </button>
    </nav>
  );
}
