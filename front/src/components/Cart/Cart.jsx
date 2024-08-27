import { useNavigate } from "react-router-dom";

import "./Cart.scss";

function EmptyCart({ navigate }) {
  return (
    <>
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
    </>
  );
}

function CartItem({ unicID, name, price, quantity }) {
  return (
    <div className="cart-item">
      <div className="cart-item__subs">
        <p className="cart-item__sub">
          ID: <b>{unicID}</b>; &nbsp;
        </p>
        <p className="cart-item__sub">
          Title: <b>{name}</b>; &nbsp;
        </p>
        <p className="cart-item__sub">
          Price: <b>{price}</b>; &nbsp;
        </p>
        <p className="cart-item__sub">
          Quantity: <b>{quantity}</b>. &nbsp;
        </p>
        <b className="cart-item__sub-total">
          Total price is <b>{quantity * price}</b>
        </b>
      </div>
      <div className="cart-item__btns">
        <button className="cart-item__btns-btn">+</button>
        <span className="cart-item__btns-count">{quantity}</span>
        <button className="cart-item__btns-btn">-</button>
      </div>
    </div>
  );
}

function CartList({ cart, setCart, setTotalPrice, setCount }) {
  const cartArray = Object.keys(cart).map((key) => cart[key]);
  return (
    <>
      <button
        onClick={() => {
          setCart({});
          setTotalPrice(0);
          setCount(0);
        }}
      >
        Empty your shopping cart ❌
      </button>
      <div className="cart__list">
        {cartArray.map((item) => (
          <CartItem
            key={item.unicID}
            unicID={item.unicID}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </>
  );
}

export default function Cart({ cart, setCart, setTotalPrice, setCount }) {
  const navigate = useNavigate();

  return (
    <div className="cart">
      {JSON.stringify(cart).length === 2 && <EmptyCart navigate={navigate} />}
      {JSON.stringify(cart).length > 2 && (
        <CartList
          cart={cart}
          setCart={setCart}
          setTotalPrice={setTotalPrice}
          setCount={setCount}
        />
      )}
    </div>
  );
}
