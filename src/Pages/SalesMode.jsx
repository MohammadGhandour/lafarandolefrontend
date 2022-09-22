import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { api } from '../Config/Config';
import './PagesStyles/SalesMode.css';

import { cartToSet } from '../functions/cartToSet';
import { cartWithoutCurrentProduct } from '../functions/cartWithoutCurrentProduct';
import FooterThead from '../Components/SalesMode/FooterThead';
import CartFooter from '../Components/SalesMode/CartFooter';
import { useNavigate } from 'react-router-dom';
import SingleProductInCart from '../Components/SalesMode/SingleProductInCart';
import { headers } from '../Config/Headers';

function SalesMode() {

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    const savedDiscount = JSON.parse(localStorage.getItem('discount'));

    const navigate = useNavigate();

    const noProductText = 'Scan barcode to add to cart';

    const barcodeSearchScannerRef = useRef(null);
    const [productBarcode, setProductBarcode] = useState('');
    const [noProductTitle, setNoProductTitle] = useState(noProductText);
    const [cart, setCart] = useState(savedCart ? savedCart : []);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [discountCurrency, setDiscountCurrency] = useState('USD');
    const [discountValue, setDiscountValue] = useState(savedDiscount ? savedDiscount : 0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [finalTotalBeforeDiscount, setFinalTotalBeforeDiscount] = useState(0);
    const currencyExchange = 29;
    const [customerName, setCustomerName] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');

    function toggleCurrency() {
        if (discountCurrency === 'USD') {
            setDiscountCurrency('LBP');
        } else {
            setDiscountCurrency('USD');
        }
    }

    function deleteProduct(product) {
        setCart(cartWithoutCurrentProduct(product, cart));
    }

    function emptyCart() {
        if (window.confirm("You're sure you wanna empty the current cart ?")) {
            localStorage.removeItem('cart');
            setCart([]);
        } else {
            return
        }
    }

    function handleQuantity(product, type) {
        const inStock = product.inStock;
        const quantity = product.quantity;
        if (quantity === inStock && type === 'increment') {
            alert('No more items in stock')
        } else if (quantity < 2 && type === 'decrement') {
            if (window.confirm('Would you like to remove this item from cart ?')) {
                setCart(cartWithoutCurrentProduct(product, cart));
            }
        }
        else {
            setCart(cartToSet(product, cart, type));
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', function (e) {
            if (isFinite(e.key)) {
                barcodeSearchScannerRef.current.focus();
            }
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('discount', JSON.stringify(discountValue));
    }, [cart, discountValue])

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

    useEffect(() => {
        let total = cart.reduce((total, item) => ((total + item.quantity * item.priceAfterDiscount)), 0);
        setFinalTotal(total - (discountCurrency === 'USD' ? discountValue : (discountValue / currencyExchange).toFixed(2)));

        let totalBeforeDiscount = cart.reduce((totalBeforeDiscount, item) => ((totalBeforeDiscount + item.quantity * item.price)), 0);
        setFinalTotalBeforeDiscount(totalBeforeDiscount - (discountCurrency === 'USD' ? discountValue : (discountValue / currencyExchange).toFixed(2)));
    }, [cart, discountValue, discountCurrency]);

    function checkout(e) {
        if (window.confirm("Are you sure you'd like to submit this order ?")) {
            e.preventDefault();
            const order =
            {
                cart: cart,
                totalBeforeDiscount: finalTotalBeforeDiscount,
                total: finalTotal,
                customerName: customerName,
                customerNumber: customerNumber
            }

            const customer = {
                customerName: customerName,
                customerNumber: customerNumber
            }

            axios.post(`${api}/orders`, order, { headers: headers })
                .then(res => {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('discount');
                    setCart([]);
                    if (customerName === '' && customerNumber === '') {
                        navigate('/');
                        window.location.reload();
                    } else {
                        axios.post(`${api}/customers`, { customer, finalTotal }, { headers: headers })
                            .then(response => {
                                navigate('/');
                                window.location.reload();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            return
        }
    }

    const titleClassName = noProductTitle !== noProductText ? 'scan-title-sales not-found-product' : 'scan-title-sales';

    return (
        <div className='full-page'>
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
            {cart.length > 0 &&
                <div className='delete-btn' onClick={emptyCart}>
                    <i className='fa-solid fa-trash icon-margin-right'></i>
                    Empty cart
                </div>
            }
            <h2 className={titleClassName}>{noProductTitle}</h2>
            {cart.length > 0 &&
                <div className='cart flex-column'>
                    <table className='products-in-cart'>
                        <FooterThead />
                        <tbody>
                            {cart.map(product => (
                                <SingleProductInCart
                                    key={product.id}
                                    product={product}
                                    deleteProduct={deleteProduct}
                                    handleQuantity={handleQuantity} />
                            ))
                            }
                        </tbody>
                    </table>
                    <form id='cart-form' onSubmit={checkout}>
                        <CartFooter
                            discountValue={discountValue}
                            finalTotal={finalTotal}
                            finalTotalBeforeDiscount={finalTotalBeforeDiscount}
                            setDiscountValue={setDiscountValue}
                            toggleCurrency={toggleCurrency}
                            discountCurrency={discountCurrency}
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            customerNumber={customerNumber}
                            setCustomerNumber={setCustomerNumber} />
                    </form>
                </div>
            }
        </div >
    )
}

export default SalesMode;
