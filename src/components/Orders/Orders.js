import { formatPrice } from "../../utils/format.js";
import {
  calculateOrderSubtotal,
  calculateItemSubtotal,
  calculateTaxesAndFees,
  calculateTotal,
  shipping,
} from "../../utils/calculations";
import "./Orders.css";

const groupOrderDetailsByOrderId = (orderDetails) => {
  // get an array of unique order ids
  const orderIds = [...new Set(orderDetails.map((d) => d.orderId))];
  console.log(orderIds);
  return orderIds.reduce((acc, orderId) => {
    acc[orderId] = orderDetails.filter((d) => d.orderId === orderId);
    return acc;
  }, {});
};

export default function Orders({
  user,
  orders,
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
}) {
  console.log(orders);
  const ordersMapping = groupOrderDetailsByOrderId(orders);
  console.log("order mapping", ordersMapping);
  console.log("order/ mapping", orders);
  const hasOrders = Boolean(Object.keys(ordersMapping)?.length);

  return (
    <div className="Orders">
      <div className="banner">
        <div className="content">
          <h2>Orders</h2>
        </div>
      </div>

      <div className="content">
        <div className="order-list">
          <div className="order-list-header">
            <span>Order</span>
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
          </div>
          {Object.keys(ordersMapping)?.map((orderId) => (
            <OrderItem
              key={orderId}
              orderId={orderId}
              orderItems={ordersMapping[orderId]}
            />
          ))}

          {!hasOrders ? (
            <div className="order-item">
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const OrderItem = ({ orderItems, orderId }) => {
  const subTotal = calculateOrderSubtotal(orderItems);

  return (
    <div className="order-item" key={orderId}>
      <h3>Order #{orderId}</h3>
      <div className="order-details">
        {orderItems.map((item) => (
          <div key={`${orderId}-${item.name}`} className="line-item">
            <span className="flex-2">{item.name}</span>
            <span className="center">{item.quantity}</span>
            <span className="center">{formatPrice(item.price)}</span>
            <span className="center">
              {formatPrice(calculateItemSubtotal(item.price, item.quantity))}
            </span>
          </div>
        ))}
        <hr></hr>
        <div className="receipt">
          <div className="receipt-subtotal">
            <span className="label">Subtotal</span>
            <span />
            <span />
            <span className="center">{formatPrice(subTotal)}</span>
          </div>

          <div className="receipt-taxes">
            <span className="label">Taxes and Fees</span>
            <span />
            <span />
            <span className="center">
              {formatPrice(calculateTaxesAndFees(subTotal))}
            </span>
          </div>

          <div className="receipt-subtotal">
            <span className="label">Shipping</span>
            <span />
            <span />
            <span className="center">{formatPrice(shipping())}</span>
          </div>

          <div className="receipt-total">
            <span className="label">Total</span>
            <span />
            <span />
            <span className="center">
              {formatPrice(calculateTotal(subTotal))}
            </span>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};
