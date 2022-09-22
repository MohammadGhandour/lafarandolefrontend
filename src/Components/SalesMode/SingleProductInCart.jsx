import React from 'react'
import ProductQuantityInCart from './ProductQuantityInCart';
import logo from '../../assets/defaultProductImage.jpg';

function SingleProductInCart({ product, handleQuantity, deleteProduct }) {
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
                    <span className='product-original-price'>{product.price} $<br /></span>
                }
                <span>{product.priceAfterDiscount} $</span>
            </th>
            <ProductQuantityInCart handleQuantity={handleQuantity} product={product} />
            <th>{product.priceAfterDiscount * product.quantity} $</th>
            <th>{product.size}</th>
            <th>
                <i className="fa-solid fa-trash-can"
                    onClick={() => deleteProduct(product)}
                >
                </i>
            </th>
        </tr>
    )
}

export default SingleProductInCart;
