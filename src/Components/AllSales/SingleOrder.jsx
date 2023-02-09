import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleOrder({ order, i, admin }) {

    const navigate = useNavigate();

    function goOrder(e) {
        if (e.button === 0) {
            navigate(`/order/${order.id}`);
        } else if (e.button === 1) {
            window.open(`${window.location.origin}/order/${order.id}`, '_blank');
        }
    };

    return (
        <tr onMouseDown={goOrder} className={`single-order-in-list ${i === 0 ? 'first-order-of-day' : ''}`}>
            <th className='order-id'>
                {order.id} {order.orderLocation === 'Instagram Delivery' ? <i className="fa-brands fa-instagram"></i> : <i className="fa-solid fa-store"></i>} {!order.paid && <i className="fa-solid fa-dollar-sign"></i>}
            </th>
            <th>{moment(order.createdAt).format('lll')}</th>
            <th>{order.itemsNumber}</th>
            <th className='order-total order-total-before-discount'>{Number(order.totalBeforeDiscount) === Number(order.total) ? '' : formatCurrency(order.totalBeforeDiscount)}</th>
            <th className='order-total'>{formatCurrency(order.total)}</th>
            {admin && <th className={order.profit > 0 ? 'order-profit' : 'order-profit-negative'}>{formatCurrency(order.profit)}</th>}
            <th>{order.customerName}</th>
        </tr>
    )
}

export default SingleOrder;
