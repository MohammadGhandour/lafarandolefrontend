import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { promoCodes } from '../../Arrays/SalesMode/promoCodes';
import './CartFooter.css';
import DropMenuCustomerInfos from './DropMenuCustomerInfos';

function CartFooter({
    discountValue,
    finalTotal,
    finalTotalBeforeDiscount,
    setDiscountValue,
    toggleCurrency,
    discountCurrency,
    setDiscountCurrency,
    customerName,
    setCustomerName,
    customerNumber,
    setCustomerNumber,
    submitButton,
    isExchangePage,
    totalProductsToExchange,
    orderLocation,
    setOrderLocation,
    customers,
    setPromoCode
}) {

    const [customerNameInputFocused, setCustomerNameInputFocused] = useState(false);
    const [customerNumberInputFocused, setCustomerNumberInputFocused] = useState(false);
    const [shownDropDown, setShownDropDown] = useState(false);

    const promoRef = useRef(null);

    useEffect(() => {
        if ((customerNameInputFocused && customerName) || (customerNumberInputFocused && customerNumber)) {
            setShownDropDown(true);
        }
    }, [customerNameInputFocused, customerName, customerNumberInputFocused, customerNumber]);

    const difference = totalProductsToExchange - finalTotal < 0.5;

    function handleNameChange(e) {
        setCustomerName(e.target.value);
    }

    function handleNumberChange(e) {
        setCustomerNumber(e.target.value);
    }

    function getPromoCode() {
        const promoToGet = promoRef.current.value;
        if (promoToGet === '') {
            setDiscountValue(0);
            setPromoCode('');
        } else {
            const promoData = promoCodes.filter(promo => {
                return promo.code.toLowerCase() === promoToGet.toLowerCase()
            });
            if (promoData.length === 1) {
                setDiscountValue(promoData[0].value);
                setDiscountCurrency(promoData[0].currency);
                setPromoCode(promoData[0].code);
            } else {
                alert('Promo Code doesnt exist');
                setDiscountValue(0);
                setPromoCode('');
            }
        }
    }


    if (!isExchangePage) {
        return (
            <div className='cart-footer flex-between-start'>
                <div className='client-credentials-wrapper col flex-column'>
                    <h3>Client Infos:</h3>
                    <div className='row flex-column'>
                        <input
                            className='client-credential-input'
                            type='text'
                            id='client-name'
                            placeholder='Client Name'
                            autoComplete='off'
                            value={customerName}
                            onChange={handleNameChange}
                            onFocus={() => setCustomerNameInputFocused(true)}
                            onBlur={() => setCustomerNameInputFocused(false)} />
                    </div>
                    <div className='row flex-column'>
                        <input
                            className='client-credential-input'
                            type='number'
                            id='client-number'
                            placeholder='Client Number'
                            value={customerNumber}
                            onChange={handleNumberChange}
                            onFocus={() => setCustomerNumberInputFocused(true)}
                            onBlur={() => setCustomerNumberInputFocused(false)} />
                        {shownDropDown &&
                            <DropMenuCustomerInfos
                                customers={customers}
                                customerName={customerName}
                                setCustomerName={setCustomerName}
                                customerNumber={customerNumber}
                                setCustomerNumber={setCustomerNumber}
                                customerNameInputFocused={customerNameInputFocused}
                                customerNumberInputFocused={customerNumberInputFocused}
                                setShownDropDown={setShownDropDown} />
                        }
                    </div>
                    <select
                        name="order_location"
                        className='select-order-location'
                        value={orderLocation}
                        onChange={(e) => setOrderLocation(e.target.value)}>
                        <option value="Ghaziyeh Store">Ghaziyeh Store</option>
                        <option value="Instagram Delivery">Instagram Delivery</option>
                    </select>
                </div>
                <div className='col flex-column discount-total-wrapper'>
                    <div className='row flex-column-start'>
                        <label htmlFor='discount-input' className='flex-between'>
                            Discount
                            <span className='currency-toggler' onClick={toggleCurrency}>({discountCurrency})</span>
                        </label>
                        <input
                            type='number' className='discount-input' value={discountValue} min='0' max={discountCurrency === 'USD' ? finalTotalBeforeDiscount : ''}
                            id='discount-input' onChange={(e) => setDiscountValue(e.target.value)} />
                    </div>
                    <div className='row flex-column-start'>
                        <label htmlFor='promo-input' className='flex-between'>PROMO CODE</label>
                        <div className="flex-between promo-wrapper">
                            <input type='text' className='discount-input' id='promo-input' ref={promoRef} />
                            <button onClick={getPromoCode} type='button'>Set</button>
                        </div>
                    </div>
                    <div className='row total-wrapper flex-between'>
                        <label className='total-wrapper-label'>Total</label>
                        <div>
                            {finalTotal !== finalTotalBeforeDiscount &&
                                <div className='total total-before-discount'>{finalTotalBeforeDiscount.toFixed(2)} $</div>
                            }
                            <div className='total'>{finalTotal.toFixed(2)} $</div>
                        </div>
                    </div>
                    <button type='submit' className='checkout-btn'>{submitButton}</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='cart-footer flex-between'>
                <div className='customer-credentials'>
                    <div className='customer-credential'>
                        <i className="fa-solid fa-user icon-margin-right"></i>
                        <span>{customerName ? customerName : 'no-name'}</span>
                    </div>
                    <div className='customer-credential'>
                        <i className="fa-solid fa-phone icon-margin-right"></i>
                        <span>{customerNumber ? customerNumber : 'no-number'}</span>
                    </div>
                </div>
                <div className='col flex-column discount-total-wrapper'>
                    <div className='row flex-column-start'>
                        <label htmlFor='discount-input' className='flex-between'>
                            Discount
                            <span className='currency-toggler' onClick={toggleCurrency}>({discountCurrency})</span>
                        </label>
                        <input
                            type='number' className='discount-input' value={discountValue} min='0' max={discountCurrency === 'USD' ? finalTotalBeforeDiscount : ''}
                            id='discount-input' onChange={(e) => setDiscountValue(e.target.value)} />
                    </div>
                    <div className='total-wrapper flex-between'>
                        <label className='total-wrapper-label'>To return:</label>
                        <div>{totalProductsToExchange} $</div>
                    </div>
                    <div className='total-wrapper flex-between'>
                        <label className='total-wrapper-label'>To buy:</label>
                        <div>
                            {finalTotal !== finalTotalBeforeDiscount &&
                                <div className='total total-before-discount'>{finalTotalBeforeDiscount.toFixed(2)} $</div>
                            }
                            <div className=''>{finalTotal.toFixed(2)} $</div>
                        </div>
                    </div>
                    <div className=
                        {
                            difference &&
                                finalTotal > 0 &&
                                totalProductsToExchange > 0 ? 'total-wrapper flex-between positive-difference' :
                                'total-wrapper flex-between negative-difference'
                        }>
                        <label className='total-wrapper-label'>Difference:</label>
                        <div>{(finalTotal - totalProductsToExchange).toFixed(2)} $</div>
                    </div>
                    <button
                        type='submit'
                        className='checkout-btn'
                        disabled=
                        {difference &&
                            finalTotal > 0 &&
                            totalProductsToExchange > 0 ? false : true
                        }>
                        {submitButton}
                    </button>
                </div>
            </div>
        )
    }
}

export default CartFooter;
