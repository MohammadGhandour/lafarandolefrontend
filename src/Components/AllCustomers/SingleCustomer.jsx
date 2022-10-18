import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';

function SingleCustomer({ customer }) {

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

    function goCustomer() {
        const customerName = customer.customerName.replace(' ', '');
        const customerNumber = customer.customerNumber;
        navigate(`/customer/${customer.id}/${customerName}/${customerNumber}`);
    }

    return (
        <tr onClick={goCustomer}>
            <th>{customer.customerName}</th>
            <th>{customer.customerNumber}</th>
            <th>{customer.numberOfOrders}</th>
            <th>{customer.totalOfAllOrders} $</th>
            <th className='back-green-profit'>{totalProfit ? totalProfit.toFixed(2) : ''} $</th>
        </tr>
    )
}

export default SingleCustomer;
