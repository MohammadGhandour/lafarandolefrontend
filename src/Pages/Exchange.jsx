import axios from 'axios';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarcodeGetProduct from '../Components/BarcodeGetProduct';
import Loader from '../Components/Loader';
import ExchangeTfoot from '../Components/Order/ExchangeTfoot';
import ExchangeThead from '../Components/Order/ExchangeThead';
import SingleProductInOrderExchange from '../Components/Order/SingleProductInOrderExchange';
import CartFooter from '../Components/SalesMode/CartFooter';
import FooterThead from '../Components/SalesMode/FooterThead';
import SingleProductInCart from '../Components/SalesMode/SingleProductInCart';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { calculateTotal } from '../functions/calculateTotal';
import { cartToSet } from '../functions/cartToSet';
import { cartWithoutCurrentProduct } from '../functions/cartWithoutCurrentProduct';
import './PagesStyles/Exchange.css';

function Exchange() {

    const navigate = useNavigate();
    const productsToExchange = useRef([]);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const expandedOrderCart = useRef([]);
    const [totalProductsToExchange, setTotalProductsToExchange] = useState(0);
    const [error, setError] = useState(false);


    const barcodeSearchScannerRef = useRef(null);
    const [productBarcode, setProductBarcode] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [cart, setCart] = useState([]);
    const noProductText = 'Scan barcode to add to cart';
    const [noProductTitle, setNoProductTitle] = useState(noProductText);
    const titleClassName = noProductTitle !== noProductText ? 'scan-title-sales not-found-product' : 'scan-title-sales';

    const [discountCurrency, setDiscountCurrency] = useState('%');
    const [discountValue, setDiscountValue] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [finalTotalBeforeDiscount, setFinalTotalBeforeDiscount] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const currencyExchange = 38000;

    function toggleCurrency() {
        if (discountCurrency === 'USD') {
            setDiscountCurrency('LBP');
        } else if (discountCurrency === 'LBP') {
            setDiscountCurrency('%');
        } else {
            setDiscountCurrency('USD')
        }
    }

    const oldOrder = useRef({});

    useEffect(() => {
        axios.get(`${api}/orders/${params.id}`, { headers: headers })
            .then(res => {
                oldOrder.current = res.data;
                // eslint-disable-next-line
                res.data.cart.map(product => {
                    if (product.quantity > 1) {
                        for (let i = 0; i < product.quantity; i++) {
                            expandedOrderCart.current.push({ ...product, quantity: 1 });
                        }
                    } else {
                        expandedOrderCart.current.push(product);
                    }
                })
                setCustomerName(res.data.customerName);
                setCustomerNumber(res.data.customerNumber);

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(true);
                setLoading(false);
            })
    }, [params.id]);

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

    function deleteProduct(product) {
        setCart(cartWithoutCurrentProduct(product, cart));
    }

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

    function exchange(e) {
        e.preventDefault();
        let cost = cart.reduce((totalCost, item) => ((totalCost + item.quantity * item.cost)), 0);
        const updated =
        {
            cart: cart,
            totalBeforeDiscount: finalTotalBeforeDiscount,
            total: finalTotal,
            cost: cost,
            discount: `${discountValue}${discountCurrency}`,
            profit: Number(finalTotal - cost),
            customerName: customerName,
            customerNumber: customerNumber
        }
        const productsToReturn = productsToExchange.current;
        const order = { updated, productsToReturn };
        axios.put(`${api}/orders/${params.id}`, order, { headers: headers })
            .then(res => {
                console.log(res);
                navigate(`/order/${params.id}`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else if (error) {
        <div className="full-page">
            Error happened while retrieving data
        </div>
    } else {
        return (
            <div className='full-page exchange-page'>
                <div className="exchange-form">
                    <h2>Products to return:</h2>
                    <table className='order-table'>
                        <ExchangeThead />
                        {
                            expandedOrderCart.current.length > 0 &&
                            <tbody className='order-tbody'>
                                {expandedOrderCart.current.map((product, i) => (
                                    <SingleProductInOrderExchange
                                        key={i}
                                        product={product}
                                        order={oldOrder}
                                        i={i}
                                        productsToExchange={productsToExchange}
                                        setTotalProductsToExchange={setTotalProductsToExchange}
                                    />
                                ))
                                }
                            </tbody>
                        }
                        <ExchangeTfoot totalProductsToExchange={totalProductsToExchange} />
                    </table>
                </div>
                <h2>Products to buy:</h2>
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
                />
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
                    </div>
                }
                <form id='cart-form' onSubmit={exchange}>
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
                        setCustomerNumber={setCustomerNumber}
                        isExchangePage={true}
                        submitButton='Exchange'
                        totalProductsToExchange={totalProductsToExchange} />
                </form>
            </div>
        )
    }
}

export default Exchange;
