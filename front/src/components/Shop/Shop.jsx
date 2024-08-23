import Card from "../Card/Card";
import sadHamster from "/hamster.webp";
import "./Shop.scss";

const prices = Array.from({ length: 12 }, () =>
  Math.floor(Math.random() * 101)
);

export default function Shop() {
  return (
    <>
      <div className="shop">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card
            className="shop__item"
            key={i}
            unicID={i}
            title={`Shop item ${i + 1}`}
            description="Sad hamster"
            imageUrl={sadHamster}
            price={prices[i]}
          />
        ))}
      </div>
    </>
  );
}
