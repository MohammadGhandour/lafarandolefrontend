import axios from 'axios';
import React from 'react';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { cartToSet } from '../functions/cartToSet';

function BarcodeGetProduct({
    setInputDisabled,
    productBarcode,
    setProductBarcode,
    cart,
    setCart,
    setNoProductTitle,
    noProductText,
    inputDisabled,
    barcodeSearchScannerRef
}) {

    function handleSubmit(e) {
        e.preventDefault();
        setInputDisabled(true);
        axios.get(`${api}/products/product-by-barcode/${productBarcode}`, { headers: headers })
            .then((res) => {
                setInputDisabled(false);
                let product = res.data;
                setProductBarcode('');
                const productAlreadyInCart = cart.find((item) => item.id === product.id);
                if (!productAlreadyInCart && product.inStock > 0) {
                    setNoProductTitle(noProductText);
                    setCart(cartToSet(product, cart, undefined));
                } else if (productAlreadyInCart && productAlreadyInCart.quantity < product.inStock) {
                    setNoProductTitle(noProductText);
                    setCart(cartToSet(product, cart, undefined));
                } else if (productAlreadyInCart && productAlreadyInCart.quantity >= product.inStock) {
                    setNoProductTitle('Product out of stock');
                } else if (!productAlreadyInCart && product.inStock <= 0) {
                    setNoProductTitle('Product out of stock');
                }
            })
            .catch(err => {
                console.log(err);
                setInputDisabled(false);
                setProductBarcode('');
                setNoProductTitle(err.response.data.error);
            })
    }

    return (

        <form className='sales-mode-form' onSubmit={handleSubmit}>
            <input
                type='number'
                ref={barcodeSearchScannerRef}
                id='scanner-input'
                className={inputDisabled ? 'input-disabled' : ''}
                value={productBarcode}
                autoFocus
                disabled={inputDisabled ? true : false}
                onInput={(e) => setProductBarcode(e.target.value)} />
        </form>
    )
}

export default BarcodeGetProduct;
