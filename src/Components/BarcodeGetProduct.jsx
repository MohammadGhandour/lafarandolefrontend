import axios from 'axios';
import React from 'react';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { cartToSet } from '../functions/cartToSet';
import styles from "../styles";

function BarcodeGetProduct({
    setInputDisabled,
    productBarcode,
    setProductBarcode,
    cart,
    setCart,
    setNoProductTitle,
    noProductText,
    inputDisabled,
    barcodeSearchScannerRef,
    emptyCart
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
        <div className="w-full flex flex-col lg:flex-row items-center gap-4">
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type='number'
                    placeholder="Barcode..."
                    ref={barcodeSearchScannerRef}
                    className={`${styles.inputClasses} ${inputDisabled ? 'input-disabled' : ''}`}
                    value={productBarcode}
                    autoFocus
                    disabled={inputDisabled ? true : false}
                    onInput={(e) => setProductBarcode(e.target.value)} />
            </form>
            {
                cart.length > 0 &&
                <div className={`${styles.redButton} w-full lg:w-max py-3`} onClick={emptyCart}><i className='fa-solid fa-trash mr-1'></i> Empty cart</div>
            }
        </div>
    )
}

export default BarcodeGetProduct;
