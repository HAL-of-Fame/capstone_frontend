import React from "react";
import Product from "../Product/Product";
import "./MerchStore.css";

export default function Main(props) {
  const { products, onAdd } = props;
  return (
    <main className="store">
      <h2>Merch Store</h2>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </main>
  );
}
