import React from 'react';

const ReviewItems = (props) => {
   const {name, category, seller, key, quantity, price } = props.product;
   const style = {margin:'20px',padding:'15px',border:'1px solid gray'}
    return (

        <div style={style}>
            <h2>Review Items</h2>
            <h3>Name: {name}</h3>
            <h5>Category: {category}</h5>
            <p>Seller: {seller}</p>
            <p>Code: {key}</p>
            <p>Quantity: {quantity}</p>
            <p><small>price: ${price}</small></p>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove Order</button>

        </div>
    );
};

export default ReviewItems;