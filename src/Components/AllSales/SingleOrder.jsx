import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function SingleOrder({ order, i }) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/order/${order.id}`)} className={`single-order-in-list ${i === 0 ? 'first-order-of-day' : ''}`}>
            <th className='order-id'>
                {order.id} {order.orderLocation === 'Instagram Delivery' ? <i className="fa-brands fa-instagram"></i> : <i className="fa-solid fa-store"></i>} {!order.paid && <i className="fa-solid fa-dollar-sign"></i>}
            </th>
            <th>{moment(order.createdAt).format('lll')}</th>
            <th>{order.itemsNumber}</th>
            <th className='order-total order-total-before-discount'>{Number(order.totalBeforeDiscount) === Number(order.total) ? '' : `${order.totalBeforeDiscount} $`}</th>
            <th className='order-total'>{order.total} $</th>
            <th className={order.profit > 0 ? 'order-profit' : 'order-profit-negative'}>{order.profit} $</th>
            <th>{order.customerName}</th>
        </tr>
    )
}

export default SingleOrder;
