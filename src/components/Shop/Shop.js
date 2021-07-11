import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setPruducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const handleProduct = (product) => {
        console.log('product added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container"> 
                {
                  products.map(product => <Product handleProduct={handleProduct} product={product}></Product>)
                }
            </div>       
            <div className="cart-container">
                <h2>This is cart container</h2>
                
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;