import React from 'react'

function ProductQuantityInCart({ handleQuantity, product }) {
    return (
        <div className="flex-1 flex justify-center items-center font-bold gap-2">
            <i className="fa-solid fa-minus" onClick={() => handleQuantity(product, 'decrement')}></i>
            <span>{product.quantity}</span>
            <i className="fa-solid fa-plus" onClick={() => handleQuantity(product, 'increment')}></i>
        </div>
    )
}

export default ProductQuantityInCart;
