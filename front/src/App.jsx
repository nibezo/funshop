import { useState } from "react";
import reactLogo from "./assets/react.svg";
import sadHamster from "/hamster.webp";
import "./App.scss";
import Card from "./components/Card/Card";
import Bar from "./components/Bar/Bar";

function App() {
  return (
    <>
      <h1>Fun Shop</h1>
      <Bar />
      <div className="shop">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card
            className="shop__item"
            key={i}
            title={`Shop item ${i + 1}`}
            description="Sad hamster"
            imageUrl={sadHamster}
            price={(Math.random() * 100).toFixed(0)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
