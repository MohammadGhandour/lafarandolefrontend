import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function SingleOrder({ order, i, ordersOfTheDay }) {

    const navigate = useNavigate();
    const totalBeforeDiscountToday = ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)).toFixed(2), 0);
    const totalToday = ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const itemsSoldToday = ordersOfTheDay?.reduce((items, item) => ((items + item.itemsNumber)), 0);

    return (
        <>
            {i === 0 &&
                <tr className='none-tr'>
                    <th className='none-th'>
                        <br />
                    </th>
                </tr>
            }
            {i === 0 &&
                <tr className='none-tr'>
                    <th className='none-th'>
                        <br />
                    </th>
                </tr>
            }
            {
                i === 0 &&
                <tr className='orders-of-the-day'>
                    <th className='order-id' >-</th>
                    <th>{moment(order.createdAt).format('llll').split(',')[0]}, {moment(order.createdAt).format('ll')}</th>
                    <th>{itemsSoldToday}</th>
                    <th className='order-total order-total-before-discount'>
                        {Number(totalBeforeDiscountToday) === Number(totalToday) ? '' : `${totalBeforeDiscountToday} $`}
                    </th>
                    <th className='order-total'>{totalToday} $</th>
                    <th className='back-green-profit'>{ordersOfTheDay.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0)} $</th>
                    <th>-</th>
                </tr>
            }
            <tr onClick={() => navigate(`/order/${order.id}`)} className={`single-order-in-list ${i === 0 ? 'first-order-of-day' : ''}`} >
                < th className='order-id' > {order.id}</th >
                <th>{moment(order.createdAt).format('lll')}</th>
                <th>{order.itemsNumber}</th>
                <th className='order-total order-total-before-discount'>{Number(order.totalBeforeDiscount) === Number(order.total) ? '' : `${order.totalBeforeDiscount} $`}</th>
                <th className='order-total'>{order.total} $</th>
                <th className='order-profit'>{order.profit} $</th>
                <th>{order.customerName}</th>
            </tr >
        </>
    )
}

export default SingleOrder;
