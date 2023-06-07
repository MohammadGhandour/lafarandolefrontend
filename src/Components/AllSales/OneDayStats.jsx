import React from "react";
import SingleOrder from "./SingleOrder";
import { formatCurrency } from "../../functions/formatCurrency";
import moment from "moment";

function OneDayStats({ day, admin, orderIdClass, query }) {

    const totalBeforeDiscountToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)), 0);
    const totalToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const itemsSoldToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((items, item) => ((items + item.itemsNumber)), 0);
    const profitToday = (ordersOfTheDay) => ordersOfTheDay?.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0);
    const singleDayDate = (day) => moment(day.date).format('ddd') + ' ' + moment(day.date).format('ll');

    return (
        <div className="w-full flex flex-col gap-1">
            {!query && <div className="w-full flex bg-custom-light-gray items-center rounded-md font-bold">
                <div className={orderIdClass}>-</div>
                <div className="flex-1 text-center py-2 whitespace-nowrap truncate">{singleDayDate(day)}</div>
                <div className="flex-1 text-center py-2">{itemsSoldToday(day.orders)}</div>
                <div className="flex-1 text-center py-2 line-through">
                    {Number(totalBeforeDiscountToday(day.orders)) === Number(totalToday) ? ""
                        : formatCurrency(totalBeforeDiscountToday(day.orders))
                    }
                </div>
                <div className="order-total flex-1 text-center py-2">{formatCurrency(totalToday(day.orders))}</div>
                {admin && <div className={`flex-1 text-center py-2 text-white ${profitToday(day.orders) > 0 ? "bg-custom-green" : "bg-crimson"}`}>{formatCurrency(profitToday(day.orders))}</div>}
                <div className="flex-1 text-center">-</div>
            </div>}
            {day.orders.map((order, i) => (
                <SingleOrder
                    key={order.id}
                    order={order}
                    admin={admin}
                    orderIdClass={orderIdClass} />
            ))}
        </div>
    );
}

export default OneDayStats;
