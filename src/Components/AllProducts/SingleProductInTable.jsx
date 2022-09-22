import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/defaultProductImage.jpg';

function SingleProductInTable({ product }) {

    const navigate = useNavigate();

    function goProduct() {
        navigate(`/product/${product.id}`);
    }

    return (
        <tr className='single-product-in-table' onClick={goProduct}>
            <th className='product-in-table-img-wrapper'>
                <img src={product.photo ? product.photo : logo} alt={product.name} />
            </th>
            <th className='single-product-in-table-name'>{product.name}</th>
            <th>{product.size}</th>
            <th>{product.quantity}</th>
            <th>{product.price} $</th>
        </tr>
    )
}

export default SingleProductInTable;
