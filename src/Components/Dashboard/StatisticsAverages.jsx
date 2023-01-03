import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';

function StatisticsAverages({ orders }) {
    const [customers, setCustomers] = useState([]);
    const [averageProductsPerOder, setAverageProductsPerOder] = useState(0);
    const [averageOrderPerCustomer, setAverageOrderPerCustomer] = useState(0);
    const [averagePricePerOrder, setAveragePricePerOrder] = useState(0);
    const [averageProfitPerOrder, setAverageProfitPerOrder] = useState(0);
    const [totalSold, setTotalSold] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [averageDifference, setAverageDifference] = useState(0);


    useEffect(() => {
        let returnedCustomersArray = [];

        axios.get(`${api}/customers`, { headers: headers })
            .then(res => {
                const customers = res.data;
                setCustomers(res.data);
                setAverageOrderPerCustomer(Number(orders.current.length / customers.length).toFixed(2));


                // eslint-disable-next-line
                customers.map(customer => {
                    if (customer.numberOfOrders > 1) {
                        axios.get(`${api}/orders/customerOrders/${customer.customerNumber}`, { headers: headers })
                            .then(res => {
                                const diffTime = Math.abs(new Date(res.data[0].createdAt) - new Date(res.data[res.data.length - 1].createdAt));
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                returnedCustomersArray.push(
                                    {
                                        'customer': customer.customerNumber,
                                        'difference': diffDays / (customer.numberOfOrders > 2 ? (customer.numberOfOrders - 1) : 1)
                                    }
                                );
                                setAverageDifference(((returnedCustomersArray?.reduce((items, customer) => ((items + customer.difference)), 0)) / returnedCustomersArray.length).toFixed(2));
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })

        const itemsSold = orders.current?.reduce((items, order) => ((items + order.itemsNumber)), 0);
        const priceSold = orders.current?.reduce((items, order) => ((items + Number(order.total))), 0);
        const profitSold = orders.current?.reduce((items, order) => ((items + Number(order.profit))), 0);
        const totalSold = orders.current?.reduce((items, order) => ((items + Number(order.total))), 0);
        const totalProfit = orders.current?.reduce((items, order) => ((items + Number(order.profit))), 0);
        setAverageProductsPerOder(Number(itemsSold / orders.current.length).toFixed(2));
        setAveragePricePerOrder(formatCurrency(priceSold / orders.current.length));
        setAverageProfitPerOrder(formatCurrency(profitSold / orders.current.length));
        setTotalSold((formatCurrency(totalSold)));
        setTotalProfit(formatCurrency(totalProfit));
        // eslint-disable-next-line
    }, [orders]);

    return (
        <div className='statistic-row averages'>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{orders.current.length}</h1>
                <p>Number of orders</p>
            </div>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{customers.length}</h1>
                <p>Number of customers</p>
            </div>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{totalSold}</h1>
                <p>Total sold</p>
            </div>
            <div className='average flex-column-center average-profit'>
                <h1 className='text-center'>{totalProfit}</h1>
                <p>Total profit sold</p>
            </div>
            <Link to='/averages-progression' className='average flex-column-center clickable-average'>
                <h1 className='text-center'>{averageProductsPerOder}</h1>
                <p>Average product per order</p>
            </Link>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{averageOrderPerCustomer}</h1>
                <p>Average order per customer</p>
            </div>
            <Link to='/averages-progression' className='average flex-column-center clickable-average'>
                <h1 className='text-center'>{averagePricePerOrder}</h1>
                <p>Average price per order</p>
            </Link>
            <Link to='/averages-progression' className='average flex-column-center clickable-average'>
                <h1 className='text-center'>{averageProfitPerOrder}</h1>
                <p>Average profit per order</p>
            </Link>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{averageDifference} days</h1>
                <p>Average repurchase time</p>
            </div>
        </div>
    )
}

export default StatisticsAverages;
