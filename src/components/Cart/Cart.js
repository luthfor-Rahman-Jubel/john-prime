
import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    //const totalPrice = cart.reduce((total, prd) => total + prd.price, 0 );
    let totalPrice = 0;
    for (let index = 0; index < cart.length; index++) {
        const product = cart[index];
        totalPrice = totalPrice + product.price * product.quantity;
    }

    let shipping = 0;
    if(totalPrice > 0  && totalPrice < 100){
        shipping = 14.90;
    }else if(totalPrice >= 100 && totalPrice < 500){
       shipping =  4.90;
    }else if(totalPrice >= 500){
        shipping = 0;
    }
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const tax = totalPrice / 6.5;
    const grandTotal = totalPrice + shipping + tax;
    return (
        <div className="cart">
            <h2>Order Summery</h2>
            <p>Items Ordered: <span>${cart.length}</span></p>
            <p><small>Total Before Tax: <span>${formatNumber(totalPrice)}</span></small></p>
            <p><small>Shipping and Handing: <span>${shipping}</span></small></p>
            <p><small>Estimated Tax: <span>${formatNumber(tax)}</span></small></p>
            <p>Order Total: <span>${formatNumber(grandTotal)}</span></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;