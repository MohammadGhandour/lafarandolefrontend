import React, { useState } from 'react';
import { useEffect } from 'react';
import logo from '../../assets/defaultProductImage.jpg';

function SingleProductInOrderExchange({ product, order, i, productsToExchange, setTotalProductsToExchange }) {

    const [isChecked, setIsChecked] = useState(false);

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(product.priceAfterDiscount);

    useEffect(() => {
        if (order.current.discount) {
            let discountCurrencyPERCENT = order.current.discount.split('%');

            if (discountCurrencyPERCENT.length > 1) {
                setPriceAfterDiscount(Number(priceAfterDiscount - (discountCurrencyPERCENT[0] / 100 * priceAfterDiscount)).toFixed(2));
            }
        }
        // eslint-disable-next-line
    }, [order]);

    function handleChange(i) {
        if (!isChecked) {
            const productAlreadyAdded = productsToExchange.current.find((item) => item.id === product.id);
            if (productAlreadyAdded) {
                productsToExchange.current =
                    productsToExchange.current.map(item => item.id === productAlreadyAdded.id ?
                        { ...item, quantity: productAlreadyAdded.quantity + 1, price: priceAfterDiscount } : { ...item, price: priceAfterDiscount });
            } else {
                productsToExchange.current.push({ ...product, price: priceAfterDiscount });
            }
        } else {
            const productAlreadyAdded = productsToExchange.current.find((item) => item.id === product.id);
            if (productAlreadyAdded.quantity > 1) {
                productsToExchange.current =
                    productsToExchange.current.map(item => item.id === productAlreadyAdded.id ?
                        { ...item, quantity: productAlreadyAdded.quantity - 1, price: priceAfterDiscount } : { ...item, price: priceAfterDiscount });
            } else {
                productsToExchange.current = productsToExchange.current.filter(product => {
                    return product.id !== productAlreadyAdded.id;
                })
            }
        }
        setIsChecked(!isChecked);
        if (productsToExchange.current.length > 0) {
            setTotalProductsToExchange(productsToExchange.current
                ?.reduce((total, item) => (Number(total) + Number(item.price) * Number(item.quantity)).toFixed(2), 0));
        } else {
            setTotalProductsToExchange(0);
        }
    }

    return (
        <tr className='product-in-order-exchange'>
            <th className='checkbox-container'>
                <input type="checkbox" id={i} className='checkbox' onChange={() => handleChange(i)} />
            </th>
            <th className='text-left p-i-c-photo'>
                <img
                    src={product.photo ? product.photo : logo}
                    alt={product.id}
                    className='product-in-cart-img' />
            </th>
            <th className='p-i-c-name'>{product.name}</th>
            <th>
                {priceAfterDiscount !== product.price &&
                    <span className='product-original-price'>{product.price} $<br /></span>
                }
                <span>{priceAfterDiscount} $</span>
            </th>
            <th>{product.size}</th>
        </tr>
    )
}

export default SingleProductInOrderExchange;
