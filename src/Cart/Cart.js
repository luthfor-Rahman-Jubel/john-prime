import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, prd) => total + prd.price, 0 );
    return (
        <div>
            <h2>Order Summery</h2>
            <p>Itmes Ordered = {cart.length}</p>
        </div>
    );
};

export default Cart;