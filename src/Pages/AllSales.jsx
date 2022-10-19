import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AllSalesThead from '../Components/AllSales/AllSalesThead';
import SingleOrder from '../Components/AllSales/SingleOrder';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import "./PagesStyles/AllSales.css";
import moment from 'moment';
import AllSalesStatistics from '../Components/AllSales/AllSalesStatistics';

function AllSales() {

    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState();
    const [unfilteredOrders, setUnfilteredOrders] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get(`${api}/orders`, { headers: headers })
            .then(response => {
                let orders = response.data;
                setUnfilteredOrders(orders);
                setLoading(false);
                // FILTER ORDERS ARRAYS
                let ordersDates = orders.map(order => moment(order.createdAt).format('L'));
                ordersDates = ordersDates.reduce(
                    (acc, order) =>
                        acc.includes(order) ? acc : acc.concat(order),
                    []
                );
                let days = [];
                // eslint-disable-next-line
                ordersDates.map(date => {
                    var singleDay = {};
                    singleDay['date'] = date;
                    singleDay['orders'] = [];
                    days.push(singleDay);
                })
                // eslint-disable-next-line
                days.map(day => {
                    // eslint-disable-next-line
                    orders.map(order => {
                        if (moment(order.createdAt).format('L') === day.date) {
                            day.orders = [...day.orders, order];
                        }
                    })
                })
                setDays(days);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [loading, setLoading]);

    useEffect(() => {
        if (unfilteredOrders && unfilteredOrders.length > 0) {
            setFilteredOrders(unfilteredOrders.filter(order => order.customerName.toLowerCase().includes(searchValue.toLowerCase()) || order.id.toString().includes(searchValue)))
        }
    }, [searchValue, unfilteredOrders, setUnfilteredOrders]);

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (days && days.length < 1) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='no-items-message'>No registered sales yet.</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <div className='flex search-input-wrapper full-width'>
                    <label htmlFor='searchInput'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input
                        type='text'
                        className='search-input'
                        id='searchInput'
                        autoComplete="off"
                        placeholder='id or customer name'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <i className="flex-center fa-solid fa-magnifying-glass fa-times" onClick={() => setSearchValue('')}></i>
                </div>
                <h3 style={{ marginTop: 20 }}>{unfilteredOrders.length} REGISTERED ORDERS</h3>
                <table className='orders-table'>
                    <AllSalesThead />
                    {!searchValue && < AllSalesStatistics orders={unfilteredOrders} />}
                    {!searchValue && unfilteredOrders.length > 0 && days.length > 0 ?
                        <tbody>
                            {
                                days.map(day => (
                                    day.orders.map((order, i) => (
                                        <SingleOrder key={order.id} order={order} i={i} ordersOfTheDay={i === 0 ? day.orders : null} />
                                    ))
                                ))
                            }
                        </tbody>
                        :
                        <tbody>
                            {filteredOrders.map(order => (
                                <SingleOrder key={order.id} order={order} />
                            ))}
                        </tbody>
                    }
                </table>
                {searchValue && filteredOrders.length < 1 &&
                    <h2 className='not-found-product text-center'>There no order related to
                        <span className='not-found-search-value'> " {searchValue} "</span>
                    </h2>
                }
            </div>
        )
    }
}

export default AllSales;
