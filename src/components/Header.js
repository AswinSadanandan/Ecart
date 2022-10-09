import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default function Header(props) {
  return (
    <header className="block header">
      <div>
        <a href="#/">
          <h1>E-Cart</h1>
        </a>
      </div>
      <div className="cart">
        <h2>
          <AiOutlineShoppingCart />
          Cart
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ""
          )}
        </h2>
      </div>
    </header>
  );
}
