  
import React from 'react';
import Product from '../Product/Product';

export default function Main(props) {
  const { products, onAdd } = props;
  return (
    <main className="block col-2">
      <h2>Merch Store</h2>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </main>
  );
}
