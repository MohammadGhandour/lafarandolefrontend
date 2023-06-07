import React from 'react';
import moment from 'moment';
import { formatCurrency } from '../../functions/formatCurrency';
import { Link } from "react-router-dom";

function SingleOrder({ order, i, admin, orderIdClass }) {

    return (
        <Link to={`/order/${order.id}`} className="w-full flex items-center py-2 bg-custom-gray hover:bg-[#eee] transition-all rounded-lg">
            <div className={`${orderIdClass} flex gap-1 items-center justify-center`}>
                <span>{order.id}</span>
                <span>{order.orderLocation === 'Instagram Delivery' ? <i className="fa-brands fa-instagram"></i> : <i className="fa-solid fa-store"></i>} {!order.paid && <i className="fa-solid fa-dollar-sign text-crimson"></i>}
                </span>
            </div>
            <div className="flex-1 text-center">{moment(order.createdAt).format('lll')}</div>
            <div className="flex-1 text-center">{order.itemsNumber}</div>
            <div className="flex-1 text-center line-through">{Number(order.totalBeforeDiscount) === Number(order.total) ? '' : formatCurrency(order.totalBeforeDiscount)}</div>
            <div className="flex-1 text-center">{formatCurrency(order.total)}</div>
            {admin && <div className={`flex-1 text-center ${order.profit > 0 ? 'text-custom-green' : 'text-crimson'} border-x border-custom-green`}>{formatCurrency(order.profit)}</div>}
            <div className="flex-1 text-center">{order.customerName}</div>
        </Link>
    )
}

export default SingleOrder;
