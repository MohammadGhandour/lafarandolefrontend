import React from 'react';
import logo from '../../assets/defaultProductImage.jpg';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleProductInOrder({ product }) {
    return (
        <tr>
            <th className='text-left p-i-c-photo'>
                <img
                    src={product.photo ? product.photo : logo}
                    alt={product.id}
                    className='product-in-cart-img' />
            </th>
            <th className='p-i-c-name'>{product.name}</th>
            <th>
                {product.priceAfterDiscount !== product.price &&
                    <span className='product-original-price'>{formatCurrency(product.price)}<br /></span>
                }
                <span>{formatCurrency(product.priceAfterDiscount)}</span>
            </th>
            <th>{product.quantity}</th>
            <th>{formatCurrency(product.priceAfterDiscount * product.quantity)}</th>
            <th>{product.size}</th>
        </tr>
    )
}

export default SingleProductInOrder;
