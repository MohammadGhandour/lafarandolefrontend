import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/defaultProductImage.jpg';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleProductInTable({ product, admin }) {

    const navigate = useNavigate();

    function goProduct() {
        if (admin) {
            navigate(`/product/${product.id}`);
        } else {
            return
        }
    }

    return (
        <tr className={Number(product.quantity) === 0 ? 'single-product-in-table quantity-0' : 'single-product-in-table'} onClick={goProduct} style={admin ? { cursor: "pointer" } : { cursor: "default" }}>
            <th className='product-in-table-img-wrapper'>
                <img src={product.photo ? product.photo : logo} alt={product.name} />
            </th>
            <th className='single-product-in-table-name'>{product.name}</th>
            <th>{product.brand.toUpperCase()}</th>
            <th>{product.category}</th>
            <th>{product.size}</th>
            <th>
                {product.quantity}
                {product.quantitySold > 0 && <span className='quantity-sold-in-product-table'><i className="fa-solid fa-caret-down icon-mr-s icon-ml-s"></i>{product.quantitySold}</span>}
            </th>
            <th>{formatCurrency(product.priceAfterDiscount)}</th>
        </tr>
    )
}

export default SingleProductInTable;
