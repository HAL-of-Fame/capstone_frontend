import React from "react";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img
        className="small"
        src={product.image}
        height={200}
        width={200}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
