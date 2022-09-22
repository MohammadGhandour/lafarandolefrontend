import React from 'react';
import { useNavigate } from 'react-router-dom';

function SingleCustomer({ customer }) {

    const navigate = useNavigate();

    function goCustomer() {
        const customerName = customer.customerName.replace(' ', '');
        const customerNumber = customer.customerNumber;
        console.log(customerNumber);
        navigate(`/customer/${customer.id}/${customerName}/${customerNumber}`);
    }

    return (
        <tr onClick={goCustomer}>
            <th>{customer.customerName}</th>
            <th>{customer.customerNumber}</th>
            <th>{customer.numberOfOrders}</th>
            <th>{customer.totalOfAllOrders} $</th>
        </tr>
    )
}

export default SingleCustomer;
