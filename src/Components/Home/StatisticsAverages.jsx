import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';

function StatisticsAverages({ orders }) {
    const [averageProductsPerOder, setAverageProductsPerOder] = useState(0);
    const [averageOrderPerCustomer, setAverageOrderPerCustomer] = useState(0);
    const [averagePricePerOrder, setAveragePricePerOrder] = useState(0);
    const [averageProfitPerOrder, setAverageProfitPerOrder] = useState(0);


    useEffect(() => {
        axios.get(`${api}/customers`, { headers: headers })
            .then(res => {
                const customers = res.data;
                setAverageOrderPerCustomer(Number(orders.current.length / customers.length).toFixed(2))
            })
            .catch(err => {
                console.log(err);
            })

        const itemsSold = orders.current?.reduce((items, order) => ((items + order.itemsNumber)), 0);
        const priceSold = orders.current?.reduce((items, order) => ((items + Number(order.total))), 0);
        const profitSold = orders.current?.reduce((items, order) => ((items + Number(order.profit))), 0);
        setAverageProductsPerOder(Number(itemsSold / orders.current.length).toFixed(2));
        setAveragePricePerOrder(Number(priceSold / orders.current.length).toFixed(2));
        setAverageProfitPerOrder(Number(profitSold / orders.current.length).toFixed(2));
    }, [orders]);

    return (
        <div className='statistic-row averages'>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{averageProductsPerOder}</h1>
                <p>Average product per order</p>
            </div>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{averageOrderPerCustomer}</h1>
                <p>Average order per customer</p>
            </div>
            <div className='average flex-column-center'>
                <h1 className='text-center'>{averagePricePerOrder} $</h1>
                <p>Average price per order</p>
            </div>
            <div className='average flex-column-center average-profit'>
                <h1 className='text-center'>{averageProfitPerOrder} $</h1>
                <p>Average profit per order</p>
            </div>
        </div>
    )
}

export default StatisticsAverages;
