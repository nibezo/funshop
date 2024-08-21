import "./UpdateCart.scss";

export default function Update() {
  return (
    <div className="update">
      <h2 style={{ textAlign: "center" }}>
        Enter cart's id and edit it (or remove)
      </h2>
      <div className="update__form">
        <input type="number" className="update__input" placeholder="Cart ID" />
        <button className="update__button">Enter</button>
      </div>
    </div>
  );
}
