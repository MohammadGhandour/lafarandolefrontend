import React from 'react'
import ProductQuantityInCart from './ProductQuantityInCart';
import logo from '../../assets/defaultProductImage.jpg';
import { formatCurrency } from '../../functions/formatCurrency';
import { Link } from "react-router-dom";

function SingleProductInCart({ product, handleQuantity, deleteProduct }) {
    return (
        <div className="w-full flex items-center hover:bg-[#eee] rounded-md  hover:text-black transition-all overflow-hidden bg-custom-gray">
            <img src={product.photo ? product.photo : logo} alt={product.id} className="w-14 aspect-square object-cover" />
            <Link to={`/product/${product.id}`} className="w-[300px] whitespace-nowrap truncate ml-4">{product.name}</Link>
            <div className="flex-1 text-center flex flex-col">
                <span className="w-full">{(formatCurrency(product.priceAfterDiscount))}</span>
                {product.priceAfterDiscount !== product.price && <span className='text-sm line-through'>{formatCurrency(product.price)}</span>}
            </div>
            <ProductQuantityInCart handleQuantity={handleQuantity} product={product} />
            <div className="flex-1 text-center">{formatCurrency(product.priceAfterDiscount * product.quantity)}</div>
            <div className="flex-1 text-center">{product.size}</div>
            <i className="fa-solid fa-trash-can w-12 min-w-[3rem] aspect-square flex items-center justify-center" onClick={() => deleteProduct(product)}></i>
        </div >
    )
}

export default SingleProductInCart;
