import "./UpdateCart.scss";
import axios from "axios";
import bin from "./bin.svg";
import { useEffect, useState } from "react";

function Modal({ setIsModal, isModal, setCart }) {
  return (
    isModal && (
      <div className="modal">
        <p className="modal__text">Cart updated successfully</p>
        <button
          className="modal__close-btn"
          onClick={() => {
            document.querySelector(".update__input").value = "";
            setIsModal(false), setCart([]);
          }}
        >
          Close
        </button>
      </div>
    )
  );
}

function CartItem({ unicID, name, price, quantity, cart, setCart }) {
  function changeQuantity(cart, setCart, unicID, operation) {
    const updatedCart = [...cart];
    const element = updatedCart.find((obj) => obj.unicID == unicID);
    console.log(element);

    if (operation === "increment") {
      updatedCart[updatedCart.indexOf(element)].quantity = quantity + 1;
    } else if (operation === "decrement") {
      updatedCart[updatedCart.indexOf(element)].quantity = quantity - 1;
    } else if (operation === "remove") {
      updatedCart.splice(updatedCart.indexOf(element), 1);
    }
    if (updatedCart[updatedCart.indexOf(element)].quantity === 0) {
      updatedCart.splice(updatedCart.indexOf(element), 1);
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
        {cart.length != 1 && (
          <button
            onClick={() => changeQuantity(cart, setCart, unicID, "remove")}
            style={{ display: "flex" }}
          >
            <img src={bin} />
          </button>
        )}
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
function CartItems({ cart, setCart, id, isModal, setIsModal }) {
  return (
    <>
      <Modal setIsModal={setIsModal} setCart={setCart} isModal={isModal} />
      {cart.map((obj) => (
        <CartItem
          key={obj.unicID}
          unicID={obj.unicID}
          name={obj.name}
          price={obj.price}
          quantity={obj.quantity}
          cart={cart}
          setCart={setCart}
        />
      ))}
      <button
        className="cart__complete-btn"
        onClick={() => {
          axios
            .put(`https://funapi.ilyadev.tech/updateCart?cart_id=${id}`, cart, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
            .then((res) => {
              setIsModal(true);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Complete your cart updation
      </button>
    </>
  );
}

export default function Update() {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [errorText, setErrorText] = useState(
    "No cart. Please enter cart id first."
  );

  function updateCart() {
    axios
      .get(`https://funapi.ilyadev.tech/getCart?cart_id=${id}`, {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add "Bearer" before token
        },
      })
      .then((res) => {
        setCart(res.data);
        setErrorText("No cart. Please enter cart id first.");
      })
      .catch((err) => {
        setCart([]);
        console.log(err);
        setErrorText("No such cart. Please enter correct cart id.");
      });
  }
  return (
    <div className="update">
      <h2 style={{ textAlign: "center" }}>
        Enter cart's id and edit it (or remove)
      </h2>
      <div className="update__form">
        <input
          type="number"
          className="update__input"
          placeholder="Cart ID"
          onChange={(e) => setId(e.target.value)}
        />
        <button className="update__button" onClick={updateCart}>
          Enter
        </button>
      </div>
      {cart.length > 0 && CartItems({ cart, setCart, id, isModal, setIsModal })}
      {cart.length === 0 && <p>{errorText}</p>}
    </div>
  );
}
