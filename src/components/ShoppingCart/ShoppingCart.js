import React from "react";
import Button from "@material-ui/core/Button";
import { useNavigate, Link } from "react-router-dom";
export default function Basket(props) {
  const navigate = useNavigate();

  const { cartItems, onAdd, onRemove, handleOnCheckout, user } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  console.log(cartItems);

  return (
    <aside className="all">
      <Button>
        <Link to="/">Buy More Movies</Link>
      </Button>
      <Button>
        <Link to="/store">Buy More Merch</Link>
      </Button>
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <img
              className="col-2"
              src={item.image}
              height={275}
              width={100}
              alt="product"
            />
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.quantity} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              {user?.email ? (
                <>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleOnCheckout}
                  >
                    Checkout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button color="inherit" variant="outlined">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" color="inherit" variant="outlined">
                    <Button color="inherit" variant="outlined">
                      Create an Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
