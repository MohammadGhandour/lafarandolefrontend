import moment from 'moment';
import React from 'react'
import AllSalesStatistics from './AllSalesStatistics';
import SingleOrder from './SingleOrder';
import { formatCurrency } from '../../functions/formatCurrency';

function AllSalesTbody({ days, unfilteredOrders, admin }) {

    const totalBeforeDiscountToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)), 0);
    const totalToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const itemsSoldToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((items, item) => ((items + item.itemsNumber)), 0);
    const profitToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0);
    const singleDayDate = (day) => moment(day.date).format('dddd') + ' ' + moment(day.date).format('ll');

    return (
        <tbody>
            {admin && <AllSalesStatistics orders={unfilteredOrders} />}
            {days.map((day, j) => (
                <React.Fragment key={j}>
                    {j !== 0 &&
                        <tr className='none-tr'>
                            <th><br /></th>
                        </tr>
                    }
                    <tr className='orders-of-the-day'>
                        <th className='order-id'>-</th>
                        <th>{singleDayDate(day)}</th>
                        <th>{itemsSoldToday(day.orders)}</th>
                        <th className='order-total order-total-before-discount'>
                            {Number(totalBeforeDiscountToday(day.orders)) === Number(totalToday) ? ''
                                : formatCurrency(totalBeforeDiscountToday(day.orders))
                            }
                        </th>
                        <th className='order-total'>{formatCurrency(totalToday(day.orders))}</th>
                        {admin && <th className={profitToday(day.orders) > 0 ? 'back-green-profit' : 'back-negative-profit'}>{formatCurrency(profitToday(day.orders))}</th>}
                        <th>-</th>
                    </tr>
                    {day.orders.map((order, i) => (
                        <SingleOrder
                            key={order.id}
                            order={order}
                            i={i} ordersOfTheDay={i === 0 ? day.orders : null}
                            admin={admin} />
                    ))}
                </React.Fragment>
            ))}
        </tbody>
    )
}

export default AllSalesTbody;
