import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ModalID from "../ModalID/ModalID";

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

function CartItem({
  unicID,
  name,
  price,
  quantity,
  cart,
  setCart,
  setCount,
  setTotalPrice,
}) {
  function changeQuantity(cart, setCart, unicID, operation) {
    const updatedCart = [...cart];
    const element = updatedCart.find((obj) => obj.unicID == unicID);

    if (operation === "increment") {
      setCount((prev) => prev + 1);
      updatedCart[updatedCart.indexOf(element)].quantity = quantity + 1;
      setTotalPrice(
        updatedCart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0)
      );
    } else if (operation === "decrement") {
      setCount((prev) => prev - 1);
      updatedCart[updatedCart.indexOf(element)].quantity = quantity - 1;
      setTotalPrice(
        updatedCart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0)
      );
      if (updatedCart[updatedCart.indexOf(element)].quantity === 0) {
        updatedCart.splice(updatedCart.indexOf(element), 1);
      }
    }
    setCart(updatedCart);
  }

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
        <button
          className="cart-item__btns-btn"
          onClick={() => changeQuantity(cart, setCart, unicID, "increment")}
        >
          +
        </button>
        <span className="cart-item__btns-count">{quantity}</span>
        <button
          className="cart-item__btns-btn"
          onClick={() => changeQuantity(cart, setCart, unicID, "decrement")}
        >
          -
        </button>
      </div>
    </div>
  );
}

function CartList({ cart, setCart, setTotalPrice, setCount }) {
  const [isModal, setIsModal] = useState(false);
  const [cartId, setCartId] = useState(0);
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
        {cart.map((item) => (
          <CartItem
            key={item.unicID}
            unicID={item.unicID}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            cart={cart}
            setCart={setCart}
            setTotalPrice={setTotalPrice}
            setCount={setCount}
          />
        ))}
      </div>
      <button
        className="cart__complete-btn"
        onClick={() => {
          axios
            .post(
              "http://funshop-backend-8077bd-25d50d-89-23-116-185.traefik.me/addCart",
              cart, // Send JSON data in the POST request
              {
                headers: {
                  "Content-Type": "application/json", // Set content type to JSON
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`, // Add "Bearer" before token
                },
              }
            )
            .then((res) => {
              setCartId(res.data.cart_id);
            })
            .catch((err) => {
              console.error(err); // Change to `console.error` for better logging of errors
            });
          setIsModal(true); // Ensure this function is updating the state correctly
        }}
      >
        Complete your order and get the cart ID
      </button>
      <ModalID
        isModal={isModal}
        setIsModal={setIsModal}
        setCart={setCart}
        setCount={setCount}
        cartId={cartId}
        setTotalPrice={setTotalPrice}
      />
    </>
  );
}

export default function Cart({ cart, setCart, setCount, setTotalPrice }) {
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
