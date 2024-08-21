export default function Cart({ setTab }) {
  return (
    <div className="cart">
      <h2>
        Empty; Go{" "}
        <a
          style={{ color: "wheat", cursor: "pointer" }}
          onClick={() => setTab("Shop")}
        >
          shop
        </a>{" "}
        and buy something
      </h2>
    </div>
  );
}
