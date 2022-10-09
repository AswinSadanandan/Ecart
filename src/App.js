import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import { useState } from "react";
function App() {
  const { products } = data;

  const [cartItems, setCartItems] = useState([]);
  const countObject = {
    Notebook: { min: 3 },
    Sanitiser: { min: 10 },
    Bag: { max: 2, min: 1 },
  };
  const onAdd = (product) => {
    var max = countObject[product.name]?.max;

    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      if (exist.qty === max) return;
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: countObject[product.name].min },
      ]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === countObject[product.name].min) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  console.log(cartItems);
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="mainrow">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
