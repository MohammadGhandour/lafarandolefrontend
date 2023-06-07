import React from 'react';
import logo from '../../assets/defaultProductImage.jpg';
import { formatCurrency } from '../../functions/formatCurrency';
import { Link } from "react-router-dom";

function SingleProductInOrder({ product }) {
    return (
        <Link to={`/product/${product.id}`} className="flex">
            <th className='text-left p-i-c-photo'>
                <img
                    src={product.photo ? product.photo : logo}
                    alt={product.id}
                    className='product-in-cart-img' />
            </th>
            <th className='p-i-c-name'>{product.name} (<span style={{ fontWeight: "normal", color: "gray" }}>{product.barcode}</span>)</th>
            <th>
                {product.priceAfterDiscount !== product.price &&
                    <span className='product-original-price'>{formatCurrency(product.price)}<br /></span>
                }
                <span>{formatCurrency(product.priceAfterDiscount)}</span>
            </th>
            <th>{product.quantity}</th>
            <th>{formatCurrency(product.priceAfterDiscount * product.quantity)}</th>
            <th>{product.size}</th>
        </Link>
    )
}

export default SingleProductInOrder;
