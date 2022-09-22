import React from 'react';

function OrderFooter({ order }) {
    return (
        <div className='flex-between credentials-total-wrapper'>
            <div className='customer-credentials'>
                <div className='customer-credential'>
                    <i className="fa-solid fa-user icon-margin-right"></i>
                    <span>{order.customerName ? order.customerName : 'no-name'}</span>
                </div>
                <div className='customer-credential'>
                    <i className="fa-solid fa-phone icon-margin-right"></i>
                    <span>{order.customerNumber ? order.customerNumber : 'no-number'}</span>
                </div>
            </div>
            <div className='row total-wrapper discount-total-wrapper flex-between'>
                <span>Total</span>
                <div>
                    {Number(order.total) !== Number(order.totalBeforeDiscount) &&
                        <div className='total total-before-discount'>
                            {Number(order.totalBeforeDiscount)} $
                        </div>
                    }
                    <div className='total'>
                        {order.total} $
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderFooter;
