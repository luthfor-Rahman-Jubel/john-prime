import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    const style = {marginLeft:'30px',padding:'10px'};
    return (  
        <div style={style}>
            <div style={style}>
            <h2>Product Details</h2>
            <h4>Product Code: {productKey}</h4>
            </div>
           
            <Product showAddToCurt={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;