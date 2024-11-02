import Card from "../Card/Card";
import sadHamster from "/hamster.webp";
import "./Shop.scss";

const prices = Array.from({ length: 12 }, () =>
  Math.floor(Math.random() * 101)
);

const goodsImages = [
  {
    title: "2GIS Ferret",
    imageUrl: "/goodsImages/2gisFerret.webp",
    description: "It's a ferret from 2GIS",
  },

  {
    title: "Bender",
    imageUrl: "/goodsImages/bender.webp",
    description: "Give me food.",
  },

  {
    title: "Indignant cat",
    imageUrl: "/goodsImages/gettingIndignant.webp",
    description: "Be indignant...",
  },
  {
    title: "Sad hamster 🧐",
    imageUrl: "/goodsImages/hamster.webp",
    description: "🥺🥲hamster",
  },
  {
    title: "Happy cat",
    imageUrl: "/goodsImages/happyCat.webp",
    description: "Who are you man😺",
  },
  {
    title: "Ferret",
    imageUrl: "/goodsImages/ferret.webp",
    description: "Ada from the hell.",
  },
  {
    title: "Misha",
    imageUrl: "/goodsImages/misha.webp",
    description: "who...",
  },
  {
    title: "Calling monkey",
    imageUrl: "/goodsImages/monkeyCall.webp",
    description: "Sell shares.",
  },
  {
    title: "Smiling monkey",
    imageUrl: "/goodsImages/monkeySmile.webp",
    description: "You look good today.",
  },
  {
    title: "Angry ferret",
    imageUrl: "/goodsImages/angryFerret.webp",
    description: "Fear the angry ferret",
  },
  {
    title: "slyCat",
    imageUrl: "/goodsImages/slyCat.webp",
    description: "😏😏",
  },
  { title: "TV", imageUrl: "/goodsImages/tv.webp", description: "Spying cat." },
];

export default function Shop({ addItem }) {
  return (
    <>
      <div className="shop">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card
            className="shop__item"
            key={i}
            unicID={i}
            title={goodsImages[i].title}
            description={goodsImages[i].description}
            imageUrl={goodsImages[i].imageUrl}
            price={prices[i]}
            addItem={addItem}
          />
        ))}
      </div>
    </>
  );
}
