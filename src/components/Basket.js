import React, { useState } from "react";

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const individualPrice = cartItems.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.qty * item.price }),
    {}
  );
  const [coupon, setCoupon] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const couponHandler = () => {
    if (couponValue === "PRIME123") {
      setCoupon(true);
    } else setCoupon(false);
    console.log("blabla", couponValue, coupon);
  };
  var bookPrice = individualPrice.Notebook ? individualPrice.Notebook : 0;
  var sanitiserPrice = individualPrice.Sanitiser
    ? individualPrice.Sanitiser
    : 0;
  var bagPrice = individualPrice.Bag ? individualPrice.Bag : 0;

  const bookPriceFunction = () => {
    if (bookPrice >= 500 && bookPrice < 600) {
      bookPrice = bookPrice - bookPrice * 0.1;
    } else if (bookPrice < 500) {
      bookPrice = bookPrice;
    } else bookPrice = bookPrice - 60;
    console.log("aaa", bookPrice);
    return bookPrice;
  };

  const sanitiserPriceFunction = () => {
    if (sanitiserPrice > 3000) {
      sanitiserPrice = sanitiserPrice - 100;
    } else sanitiserPrice = sanitiserPrice;
  };
  bookPriceFunction(bookPrice);
  sanitiserPriceFunction(sanitiserPrice);
  var totalPrice = bookPrice + sanitiserPrice + bagPrice;
  const totalPriceFunction = () => {
    if (coupon && totalPrice > 10000) {
      totalPrice = totalPrice - 125;
    } else totalPrice = totalPrice;
    return totalPrice;
  };
  totalPriceFunction(totalPrice, bookPrice, sanitiserPrice, bagPrice);
  const reloadPage = () => {
    alert("Implement Checkout!");
    window.location.reload();
  };
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <input
              className="input"
              placeholder="PRIME123 for orders greater than 10000"
              value={couponValue}
              onChange={(e) => setCouponValue(e.target.value)}
            ></input>
            <button onClick={couponHandler}>Submit</button>
            <div className="row">
              <div className="col-2">Discounted Notebook Price</div>
              <div className="col-1 text-right">${bookPrice}</div>
            </div>
            <div className="row">
              <div className="col-2">Discounted Sanitiser Price</div>
              <div className="col-1 text-right">${sanitiserPrice}</div>
            </div>
            <div className="row">
              <div className="col-2">Bag Price</div>
              <div className="col-1 text-right">${bagPrice}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={reloadPage}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
