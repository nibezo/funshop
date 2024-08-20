import React from "react";
import "./Card.scss";

export default function Card({
  title,
  description,
  imageUrl,
  price,
  className,
}) {
  return (
    <div className={`card ${className}`}>
      <img src={imageUrl} alt={title} className="card__image" />
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <button className="card__button">Buy for {price} 💎</button>
    </div>
  );
}
