import moment from 'moment';
import React from 'react'
import SingleOrder from './SingleOrder';
import { formatCurrency } from '../../functions/formatCurrency';

function AllSalesTbody({ days, admin, orderIdClass }) {

    const totalBeforeDiscountToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)), 0);
    const totalToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const itemsSoldToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((items, item) => ((items + item.itemsNumber)), 0);
    const profitToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0);
    const singleDayDate = (day) => moment(day.date).format('dddd') + ' ' + moment(day.date).format('ll');

    return (
        <div className="w-full">
            {days.map((day, j) => (
                <div key={j} className={`w-full flex flex-col gap-1 ${j !== 0 && "my-12"}`}>
                    <div className="w-full flex bg-custom-light-gray items-center rounded-md">
                        <div className={orderIdClass}>-</div>
                        <div className="flex-1 text-center py-2">{singleDayDate(day)}</div>
                        <div className="flex-1 text-center py-2">{itemsSoldToday(day.orders)}</div>
                        <div className="flex-1 text-center py-2 order-total order-total-before-discount">
                            {Number(totalBeforeDiscountToday(day.orders)) === Number(totalToday) ? ""
                                : formatCurrency(totalBeforeDiscountToday(day.orders))
                            }
                        </div>
                        <div className="order-total flex-1 text-center py-2">{formatCurrency(totalToday(day.orders))}</div>
                        {admin && <div className={`flex-1 text-center py-2 text-white ${profitToday(day.orders) > 0 ? "bg-custom-green" : "bg-crimson"}`}>{formatCurrency(profitToday(day.orders))}</div>}
                        <div className="flex-1 text-center">-</div>
                    </div>
                    {day.orders.map((order, i) => (
                        <SingleOrder
                            key={order.id}
                            order={order}
                            i={i} ordersOfTheDay={i === 0 ? day.orders : null}
                            admin={admin}
                            orderIdClass={orderIdClass} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default AllSalesTbody;
