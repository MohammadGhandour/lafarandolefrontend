import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function SingleOrder({ order }) {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/order/${order.id}`)}>
            <th className='order-id'>{order.id}</th>
            <th>{moment(order.createdAt).format('lll')}</th>
            <th>{order.itemsNumber}</th>
            <th className='order-total order-total-before-discount'>{order.totalBeforeDiscount} $</th>
            <th className='order-total'>{order.total} $</th>
            <th>{order.customerName}</th>
        </tr>
    )
}

export default SingleOrder;
