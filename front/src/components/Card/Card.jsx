import "./Card.scss";
import { useState } from "react";
export default function Card({
  title,
  description,
  imageUrl,
  price,
  className,
  unicID,
  addItem,
}) {
  const [count, setCount] = useState(0);
  function initPriceCalculate() {
    if (!count) {
      setCount(count + 1);
      addItem(unicID, title, price, 1, imageUrl);
    }
  }

  function CalculatePrice() {
    return (
      <div className="card__button-calc">
        <div
          className="card__button-sign"
          onClick={() => {
            setCount(count + 1);
            addItem(unicID, title, price, count + 1, imageUrl);
          }}
        >
          +
        </div>
        <p className="card__price">
          {count} | {price * count}💎
        </p>
        <div
          className="card__button-sign"
          onClick={() => {
            setCount(count - 1);
            addItem(unicID, title, price, count - 1, imageUrl);
          }}
        >
          -
        </div>
      </div>
    );
  }
  return (
    <div className={`card ${className}`} unicid={unicID}>
      <img src={imageUrl} alt={title} className="card__image" />
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <button className="card__button" onClick={initPriceCalculate}>
        {count > 0 ? <CalculatePrice /> : `Buy for ${price} 💎`}
      </button>
    </div>
  );
}
