import React from 'react'

function ProductQuantityInCart({ handleQuantity, product }) {
    return (
        <th className='th-quantity'>
            <i className="fa-solid fa-minus"
                onClick={() => handleQuantity(product, 'decrement')}>
            </i>
            <span>{product.quantity}</span>
            <i className="fa-solid fa-plus"
                onClick={() => handleQuantity(product, 'increment')}>
            </i>
        </th>
    )
}

export default ProductQuantityInCart;
