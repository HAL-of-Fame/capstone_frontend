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