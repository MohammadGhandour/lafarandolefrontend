import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleCustomer({ customer, admin }) {

    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        axios.get(`${api}/orders/customerOrders/${customer.customerNumber}`, { headers: headers })
            .then(res => {
                const customerOrders = res.data;
                let totalProfit = customerOrders.reduce((totalProfit, order) => (totalProfit + Number(order.profit)), 0)
                setTotalProfit(totalProfit);
            })
            .catch(err => {
                console.log(err);
            })
    }, [customer.customerNumber]);

    return (
        <Link to={`/customer/${customer.id}/${customer.customerName}/${customer.customerNumber}`} className="w-full flex items-center rounded-md capitalize overflow-hidden bg-custom-gray hover:bg-[#eee]">
            <div className="flex-1 text-center py-2 whitespace-nowrap truncate">{customer.customerName}</div>
            <div className="flex-1 text-center py-2">{customer.customerNumber}</div>
            <div className="flex-1 text-center py-2">{customer.numberOfOrders}</div>
            {admin && <div className="flex-1 text-center py-2">{formatCurrency(customer.totalOfAllOrders)}</div>}
            {admin && <div className="flex-1 text-center py-2 bg-custom-green text-white">{formatCurrency(totalProfit.toFixed(2))}</div>}
        </Link>
    )
}

export default SingleCustomer;
