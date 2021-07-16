import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, stock, seller, price, key} = props.product;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt="" />
            </div>
            <div className="details">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link> </h4>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only{stock} left in stock please - order soon</small></p>
                {props.showAddToCurt && <button onClick={() => props.handleProduct(props.product)} className="main-button"> <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>}
            </div>
            
        </div>
    );
};

export default Product;