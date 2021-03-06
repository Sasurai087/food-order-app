import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bump, setBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  //object destructuring to pull just items out of cartCtx - now useEffect only fires when there's a change in cart items
  const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBump(true);
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    //cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
