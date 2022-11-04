import React, { useEffect, useState } from 'react';

function DropMenuCustomerInfos({
    customers,
    customerName,
    setCustomerName,
    customerNumber,
    setCustomerNumber,
    customerNameInputFocused,
    customerNumberInputFocused,
    setShownDropDown
}) {

    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        if (customerNameInputFocused && customerName) {
            setFilteredCustomers(customers.filter(customer => customer.customerName.toLowerCase().includes(customerName.toLowerCase())));
        } else if (customerNumber) {
            setFilteredCustomers(customers.filter(customer => (customer.customerNumber).toString().includes(customerNumber.toString())));
        } else {
            setFilteredCustomers([]);
        }
        // eslint-disable-next-line
    }, [customerName, customerNumber, customers]);

    function handleClick(customer) {
        setCustomerName(customer.customerName);
        setCustomerNumber(customer.customerNumber);
        setShownDropDown(false);
    }


    if (filteredCustomers.length > 0) {
        return (
            <div className='drop-menu-customer-infos'>
                {filteredCustomers.map(customer => (
                    <div
                        key={customer.id}
                        className='customer-in-drop-down'
                        onClick={() => handleClick(customer)}>
                        {customer.customerName}, {customer.customerNumber}
                    </div>
                ))}
            </div>
        )
    }
}

export default DropMenuCustomerInfos;
