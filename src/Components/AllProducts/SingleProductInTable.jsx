import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/defaultProductImage.jpg';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleProductInTable({ product, admin }) {

    const navigate = useNavigate();

    function goProduct(e) {
        console.log("bitch");
        // if (admin) {
        if (e.button === 1 || e.ctrlKey) {
            window.open(`${window.location.origin}/product/${product.id}`, '_blank');
        } else if (e.button === 0) {
            navigate(`/product/${product.id}`);
        }
        // } else {
        //     return
        // }
    }

    return (
        <tr className={`single-product-in-table ${product.discount !== 0 ? "product-discount" : ""} ${Number(product.quantity) === 0 ? 'quantity-0' : ''}`} onMouseDown={goProduct} style={{ cursor: "pointer" }}>
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
