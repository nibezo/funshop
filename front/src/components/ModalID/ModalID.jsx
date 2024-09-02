import "./ModalID.scss";
import { useState } from "react";

export default function ModalID({
  isModal,
  setIsModal,
  setCart,
  setCount,
  setTotalPrice,
}) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      {isModal && (
        <div className="modal">
          <p className="modal__text">
            Click on your ID to copy it:{" "}
            <b
              onClick={() => {
                navigator.clipboard.writeText("123456");
                setIsCopied(true);
              }}
            >
              123456
            </b>
          </p>
          <button
            className="modal__close"
            style={{ color: isCopied ? "#2bf7ac" : "white" }}
            onClick={() => {
              setIsModal(false);
              setIsCopied(false);
              setCart([]);
              setCount(0);
              setTotalPrice(0);
            }}
          >
            {isCopied ? "ID copied, close" : "Thank you!"}
          </button>
        </div>
      )}
    </>
  );
}
