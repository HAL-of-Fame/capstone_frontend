<<<<<<< HEAD
// import { useEffect } from "react"
// import { useLocation } from "react-router-dom"
// // import ProductGrid from "../ProductGrid/ProductGrid"
// import "./MerchStore.css"

// export default function Home({
//   isFetching,
//   products,
//   activeCategory,
//   searchInputValue,
//   addToCart,
//   removeFromCart,
//   getQuantityOfItemInCart,
// }) {
//   const location = useLocation() 


//   useEffect(() => {
//     // some silly react router magic to get hash links to work
//     if (location.hash) {
//       const el = document.querySelector(location.hash)
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" })
//       }
//     }
//   }, [location.hash])

//   const productsByCategory =
//     Boolean(activeCategory) && activeCategory.toLowerCase() !== "all categories"
//       ? products.filter((p) => p.category === activeCategory.toLowerCase())
//       : products

//   const productsToShow = Boolean(searchInputValue)
//     ? productsByCategory.filter((p) => p.name.toLowerCase().indexOf(searchInputValue))
//     : productsByCategory  

// //   return (
//     <div className="Home">
//         <h1>Merch Store</h1>
//       <ProductGrid
//         products={productsToShow}
//         isFetching={isFetching}
//         addToCart={addToCart}
//         removeFromCart={removeFromCart}
//         getQuantityOfItemInCart={getQuantityOfItemInCart}
//       />
//     </div>
//   )
// }
=======
  
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
>>>>>>> e162d19e7dc540d80f17edb8bfc0ba01bffe6140
