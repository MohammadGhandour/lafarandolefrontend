import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderFooter({ order }) {
    const navigate = useNavigate();
    const [thereIsDiscount, setThereIsDiscount] = useState(false);

    useEffect(() => {
        if (order.totalBeforeDiscount === order.total) {
            setThereIsDiscount(false);
        } else {
            setThereIsDiscount(true);
        }
    }, [order.total, order.totalBeforeDiscount]);

    return (
        <div>
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
                    <div className="customer-credential">
                        {order.orderLocation === 'Instagram Delivery' ? <i className="fa-brands fa-instagram icon-margin-right"></i> : <i className="fa-solid fa-store icon-margin-right"></i>}
                        <span>{order.orderLocation}</span>
                    </div>
                </div>
                <div className='total-wrapper discount-total-wrapper'>
                    {thereIsDiscount && <div className='flex-between'>
                        <span>Subtotal:</span>
                        <div>
                            <div className='fs-20 total-before-discount'>
                                {order.totalBeforeDiscount} $
                            </div>
                        </div>
                    </div>}
                    {thereIsDiscount && <div className='flex-between'>
                        <span>Discount:</span>
                        <div className='total'>-{order.discount}</div>
                    </div>}
                    <div className='flex-between'>
                        <span>Total:</span>
                        <div className='fs-20'>{order.total} $</div>
                    </div>
                    <div className='flex-between order-cost'>
                        <span>Cost:</span>
                        <div className='total'>{order.cost} $</div>
                    </div>
                    <div className='flex-between'>
                        <span>Profit:</span>
                        <div className='fs-20 order-profit'>{order.profit} $</div>
                    </div>
                </div>
            </div>
            <div className="flex order-footer-btns">
                <button className='delete-btn' onClick={() => navigate(`/exchange/${order.id}`)}>Exchange</button>
            </div>
        </div>
    )
}

export default OrderFooter;
