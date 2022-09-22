import React from 'react';
import './CartFooter.css';

function CartFooter({
    discountValue,
    finalTotal,
    finalTotalBeforeDiscount,
    setDiscountValue,
    toggleCurrency,
    discountCurrency,
    customerName,
    setCustomerName,
    customerNumber,
    setCustomerNumber
}) {
    return (
        <div className='cart-footer flex-between'>
            <div className='client-credentials-wrapper col flex-column'>
                <h3>Client Infos:</h3>
                <div className='row flex-column'>
                    <input
                        className='client-credential-input'
                        type='text'
                        id='client-name'
                        placeholder='Client Name'
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div className='row flex-column'>
                    <input
                        className='client-credential-input'
                        type='number'
                        id='client-number'
                        placeholder='Client Number'
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)} />
                </div>
            </div>
            <div className='col flex-column discount-total-wrapper'>
                <div className='row flex-column-start'>
                    <label htmlFor='discount-input' className='flex-between'>
                        Discount
                        <span className='currency-toggler' onClick={toggleCurrency}>({discountCurrency})</span>
                    </label>
                    <input
                        type='number' className='discount-input' value={discountValue} min='0' max={finalTotal}
                        id='discount-input' onChange={(e) => setDiscountValue(e.target.value)} />
                </div>
                <div className='row total-wrapper flex-between'>
                    <label>Total</label>
                    <div>
                        {finalTotal !== finalTotalBeforeDiscount &&
                            <div className='total total-before-discount'>{finalTotalBeforeDiscount.toFixed(2)} $</div>
                        }
                        <div className='total'>{finalTotal.toFixed(2)} $</div>
                    </div>
                </div>
                <button type='submit' className='checkout-btn'>Checkout</button>
            </div>
        </div>
    )
}

export default CartFooter;
