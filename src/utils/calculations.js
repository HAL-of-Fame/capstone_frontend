export const calculateItemSubtotal = (price, quantity) => price * quantity

export const calculateOrderSubtotal = (items) => {
  return items.reduce((acc, item) => (acc += calculateItemSubtotal(item.price, item.quantity)), 0)
}

export const calculateTaxesAndFees = (subTotal) => {
  return subTotal * 0.14
}

export const shipping =() =>{
  return 20
}

export const calculateTotal = (subTotal) => {
  return subTotal + calculateTaxesAndFees(subTotal) + shipping()
}