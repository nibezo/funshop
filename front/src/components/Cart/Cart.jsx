import { useNavigate } from "react-router-dom";

function EmptyCart({ navigate }) {
  return (
    <h2>
      Empty; Go{" "}
      <a
        style={{ color: "wheat", cursor: "pointer" }}
        onClick={() => navigate("/Main/Shop")}
      >
        shop
      </a>{" "}
      and buy something
    </h2>
  );
}
export default function Cart({ cart }) {
  const navigate = useNavigate();
  return (
    <div className="cart">
      <EmptyCart navigate={navigate} />
    </div>
  );
}
