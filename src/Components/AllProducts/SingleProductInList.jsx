import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SingleProductInList.css";
import logo from '../../assets/defaultProductImage.jpg';

function SingleProduct({ product }) {
    const navigate = useNavigate();

    function goProduct() {
        navigate(`/product/${product._id}`);
    }

    return (
        <div className='single-product-in-list' onClick={goProduct}>
            <img src={product.photo ? product.photo : logo} alt={product.name} />
            <span className='product-name'>{product.name}</span>
            <span className='product-size center-text'>{product.size}</span>
            <span className='product-quantity center-text'>{product.quantity}</span>
            <span className='product-price center-text'>{product.price} $</span>
            <span></span>
        </div>
    )
}

export default SingleProduct;
