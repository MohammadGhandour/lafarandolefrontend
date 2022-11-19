import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AllSalesThead from '../Components/AllSales/AllSalesThead';
import SingleOrder from '../Components/AllSales/SingleOrder';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import "./PagesStyles/AllSales.css";
import { sortArrayOfObjectsPerDay } from '../functions/sortArrayOfObjectsPerDay';
import AllSalesTbody from '../Components/AllSales/AllSalesTbody';
import AllSalesSearchInput from '../Components/AllSales/AllSalesSearchInput';

function AllSales() {

    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState();
    const [unfilteredOrders, setUnfilteredOrders] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [rawOrders, setRawOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${api}/orders`, { headers: headers })
            .then(response => {
                let orders = response.data;
                setRawOrders(response.data);
                setUnfilteredOrders(orders);
                // FILTER ORDERS ARRAYS
                setDays(sortArrayOfObjectsPerDay(orders, 'orders'));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data.error)
                } else if (err.message === 'Network Error') {
                    setError('An error occured while communicating with the server.');
                }
                setLoading(false);
            })
    }, [loading, setLoading]);

    function sortDefault() {
        setSearchValue('');
    }

    function instagramOrders() {
        setFilteredOrders(rawOrders.filter(order => {
            return order.orderLocation === 'Instagram Delivery'
        }));
    }

    function ghaziyehOrders() {
        setFilteredOrders(rawOrders.filter(order => {
            return order.orderLocation === 'Ghaziyeh Store'
        }));
    }

    function handleChange(e) {
        setSortBy(e.target.value);
        if (e.target.value === 'default') {
            sortDefault();
        } else if (e.target.value === 'Instagram Delivery') {
            instagramOrders();
        } else {
            ghaziyehOrders();
        }
    }

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='general-error'>{error}</ErrorMessage>
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
                <AllSalesSearchInput
                    unfilteredOrders={unfilteredOrders}
                    setFilteredOrders={setFilteredOrders}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setSortBy={setSortBy} />
                <div className='flex-between mt-l mb-l'>
                    <h3>{sortBy === 'default' ? unfilteredOrders.length : filteredOrders.length} REGISTERED ORDERS</h3>
                    <select
                        name="sortby"
                        id="sortby"
                        className='select-filter'
                        onChange={handleChange}>
                        <option value="default">Last added</option>
                        <option value="Instagram Delivery">Instagram Delivery</option>
                        <option value="Ghaziyeh Store">Ghaziyeh Store</option>
                    </select>
                </div>
                <div className="table-wrapper">
                    <table className='orders-table'>
                        <AllSalesThead />
                        {!searchValue && unfilteredOrders.length > 0 && sortBy === 'default' && days.length > 0 ?
                            <AllSalesTbody days={days} unfilteredOrders={unfilteredOrders} />
                            :
                            <tbody>
                                {filteredOrders.map(order => (
                                    <SingleOrder key={order.id} order={order} />
                                ))}
                            </tbody>
                        }
                    </table>
                </div>
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
