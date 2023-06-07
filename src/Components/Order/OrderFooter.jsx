import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';
import { getSalesPerson } from "../../functions/getSalesPerson";
import styles from "../../styles";

function OrderFooter({ order, admin }) {

    const navigate = useNavigate();
    const [thereIsDiscount, setThereIsDiscount] = useState(false);
    const [paid, setPaid] = useState(order.paid);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (order.totalBeforeDiscount === order.total) {
            setThereIsDiscount(false);
        } else {
            setThereIsDiscount(true);
        }
    }, [order.total, order.totalBeforeDiscount]);

    function updateOrderStatus() {
        setSubmitting(true);
        const updatePaidTo = !order.paid;
        axios.put(`${api}/orders/orderStatus/${order.id}`, { updatePaidTo }, { headers: headers })
            .then(res => {
                setPaid(!paid);
                setSubmitting(false);
                navigate('/all-sales');
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            })
    }

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
                    <div className="customer-credential">
                        <i className="fa-solid fa-percent icon-margin-right"></i>
                        {order.promoCode ? <span>{order.promoCode}</span> : 'No promo'}
                    </div>
                    <div className="customer-credential">
                        <i className="fa-solid fa-people-group icon-margin-right"></i>
                        Seller: {getSalesPerson(order.salesperson_id)}
                    </div>
                </div>
                <div className="flex-column-start gap-l">
                    <div className='total-wrapper discount-total-wrapper'>
                        {thereIsDiscount && <div className='flex-between'>
                            <span>Subtotal:</span>
                            <div>
                                <div className='fs-20 total-before-discount'>
                                    {formatCurrency(order.totalBeforeDiscount)}
                                </div>
                            </div>
                        </div>}
                        {thereIsDiscount && <div className='flex-between'>
                            <span>Discount:</span>
                            <div className='total'>-{order.discount}</div>
                        </div>}
                        <div className='flex-between'>
                            <span>Total:</span>
                            <div className='fs-20'>{formatCurrency(order.total)}</div>
                        </div>
                        {admin && <div className='flex-between order-cost'>
                            <span>Cost:</span>
                            <div className='total'>{formatCurrency(order.cost)}</div>
                        </div>}
                        {admin && <div className='flex-between'>
                            <span>Profit:</span>
                            <div className='fs-20 order-profit'>{formatCurrency(order.profit)}</div>
                        </div>}
                    </div>
                    <div className='flex-between gap'>
                        <input
                            type="checkbox"
                            name="paid"
                            id="paid"
                            className='paid-checkbox'
                            onChange={updateOrderStatus}
                            checked={paid}
                            disabled={submitting}
                        />
                        <label htmlFor="paid" id='paid-label'>This order's payment has been received</label>
                    </div>
                </div>
            </div>
            <div className="flex order-footer-btns">
                <button className={`${styles.redButton}`} onClick={() => navigate(`/exchange/${order.id}`)}>Exchange</button>
            </div>
        </div>
    )
}

export default OrderFooter;
