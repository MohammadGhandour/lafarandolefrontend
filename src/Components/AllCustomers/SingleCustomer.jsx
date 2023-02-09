import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';

function SingleCustomer({ customer, admin }) {

    const navigate = useNavigate();
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

    function goCustomer(e) {
        const customerName = customer.customerName.replace(' ', '');
        const customerNumber = customer.customerNumber;

        if (e.button === 0) {
            navigate(`/customer/${customer.id}/${customerName}/${customerNumber}`);
        } else if (e.button === 1) {
            window.open(`${window.location.origin}/customer/${customer.id}/${customerName}/${customerNumber}`, '_blank');
        }
    }

    return (
        <tr onMouseDown={goCustomer}>
            <th>{customer.customerName}</th>
            <th>{customer.customerNumber}</th>
            <th>{customer.numberOfOrders}</th>
            {admin && <th>{formatCurrency(customer.totalOfAllOrders)}</th>}
            {admin && <th className='back-green-profit'>{formatCurrency(totalProfit.toFixed(2))}</th>}
        </tr>
    )
}

export default SingleCustomer;
