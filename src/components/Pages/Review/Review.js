import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css';
import thankImage from '../../../images/thankYou.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () =>{
        history.push('/shipment');
    }
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={thankImage} alt="" />
    }
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const curtProduct = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
            });
            setCart(curtProduct);
        },[]);
    const removeProduct = (productKey) =>{
        const newProduct = cart.filter(product => product.key !== productKey);
        setCart(newProduct);
        removeFromDatabaseCart(productKey);
    }
    return (
    <div className="twin-container">
        <div className="product-container">
            {
                cart.map(product => <ReviewItems removeProduct={removeProduct} key={product.key} product={product}></ReviewItems>)
            }
            { thankYou }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
        </div>    
    </div>
    );
};

export default Review;