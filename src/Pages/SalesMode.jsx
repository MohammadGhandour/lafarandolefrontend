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
import BarcodeGetProduct from '../Components/BarcodeGetProduct';
import { calculateTotal } from '../functions/calculateTotal';

function SalesMode() {

    const savedCart = JSON.parse(localStorage.getItem('cart'));

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const noProductText = 'Scan barcode to add to cart';

    const barcodeSearchScannerRef = useRef(null);
    const [productBarcode, setProductBarcode] = useState('');
    const [noProductTitle, setNoProductTitle] = useState(noProductText);
    const [cart, setCart] = useState(savedCart ? savedCart : []);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [discountCurrency, setDiscountCurrency] = useState('%');
    const [discountValue, setDiscountValue] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [finalTotalBeforeDiscount, setFinalTotalBeforeDiscount] = useState(0);
    const [orderLocation, setOrderLocation] = useState('Ghaziyeh Store');
    const [promoCode, setPromoCode] = useState('');
    const currencyExchange = 38000;
    const [customerName, setCustomerName] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [customers, setCustomers] = useState([]);
    const [salespersonId, setSalespersonId] = useState(Number(localStorage.getItem("userId")) > 2 ? Number(localStorage.getItem("userId")) : 2);

    function toggleCurrency() {
        if (discountCurrency === 'USD') {
            setDiscountCurrency('LBP');
        } else if (discountCurrency === 'LBP') {
            setDiscountCurrency('%');
        } else {
            setDiscountCurrency('USD')
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
        });
        axios.get(`${api}/customers/customers-drop-down`, { headers: headers })
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        calculateTotal(
            cart,
            setFinalTotal,
            discountCurrency,
            discountValue,
            currencyExchange,
            setFinalTotalBeforeDiscount
        );
    }, [cart, discountValue, discountCurrency]);

    function checkout(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you'd like to submit this order ?")) {
            let cost = cart.reduce((totalCost, item) => ((totalCost + item.quantity * item.cost)), 0);
            const order =
            {
                cart: cart,
                totalBeforeDiscount: finalTotalBeforeDiscount,
                total: finalTotal,
                cost: cost,
                discount: `${discountValue}${discountCurrency}`,
                profit: Number(finalTotal - cost),
                orderLocation: orderLocation,
                customerName: customerName,
                customerNumber: customerNumber,
                promoCode: promoCode,
                salesperson_id: Number(salespersonId)
            }
            const customer = { customerName: customerName, customerNumber: customerNumber }
            setSubmitting(true);
            axios.post(`${api}/orders`, order, { headers: headers })
                .then(res => {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('discount');
                    setCart([]);
                    if (customerName === '' && customerNumber === '') {
                        navigate('/all-sales');
                        setSubmitting(false);
                    } else {
                        axios.post(`${api}/customers`, { customer, finalTotal }, { headers: headers })
                            .then(response => {
                                navigate('/all-sales');
                                setSubmitting(false);
                            })
                            .catch(err => {
                                console.log(err);
                                setSubmitting(false);
                            })
                    }
                })
                .catch(err => {
                    setSubmitting(false);
                    console.log(err);
                })
        } else {
            return
        }
    }

    return (
        <div className='full-page'>
            <BarcodeGetProduct
                setInputDisabled={setInputDisabled}
                productBarcode={productBarcode}
                setProductBarcode={setProductBarcode}
                cart={cart}
                setCart={setCart}
                setNoProductTitle={setNoProductTitle}
                noProductText={noProductText}
                inputDisabled={inputDisabled}
                barcodeSearchScannerRef={barcodeSearchScannerRef}
                emptyCart={emptyCart}
            />
            <h2 className={`font-bold text-center text-xl lg:text-3xl my-4 ${noProductTitle !== noProductText ? 'not-found-product' : ''}`}>{noProductTitle}</h2>
            {cart.length > 0 &&
                <div className='cart flex-column'>
                    <div className='products-in-cart'>
                        <div className="w-full overflow-x-auto">
                            <div className="w-full flex-col flex mt-4 min-w-[800px] pb-2 lg:pb-0 gap-1">
                                <FooterThead />
                                {cart.map(product => (
                                    <SingleProductInCart
                                        key={product.id}
                                        product={product}
                                        deleteProduct={deleteProduct}
                                        handleQuantity={handleQuantity} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <form id='cart-form' onSubmit={checkout}>
                        <CartFooter
                            discountValue={discountValue}
                            finalTotal={finalTotal}
                            finalTotalBeforeDiscount={finalTotalBeforeDiscount}
                            setDiscountValue={setDiscountValue}
                            toggleCurrency={toggleCurrency}
                            discountCurrency={discountCurrency}
                            setDiscountCurrency={setDiscountCurrency}
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            customerNumber={customerNumber}
                            setCustomerNumber={setCustomerNumber}
                            customers={customers}
                            orderLocation={orderLocation}
                            setOrderLocation={setOrderLocation}
                            setPromoCode={setPromoCode}
                            submitting={submitting}
                            salespersonId={salespersonId}
                            setSalespersonId={setSalespersonId}
                            submitButton='Submit' />
                    </form>
                </div>
            }
        </div>
    )
}

export default SalesMode;
