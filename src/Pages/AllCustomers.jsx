import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AllCustomersThead from '../Components/AllCustomers/AllCustomersThead';
import SingleCustomer from '../Components/AllCustomers/SingleCustomer';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import "./PagesStyles/Customers.css";
import moment from 'moment';

function AllCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCustomer, setFilteredCustomer] = useState([]);
    const [sortBy, setSortBy] = useState('lastModified');
    const [rawCustomers, setRawCustomers] = useState([]);

    useEffect(() => {
        axios.get(`${api}/customers`, { headers: headers })
            .then(res => {
                setCustomers(res.data.slice().sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)));
                if (rawCustomers.length < 1) {
                    setRawCustomers(res.data.slice().sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)));
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [rawCustomers]);

    useEffect(() => {
        if (searchValue) {
            setFilteredCustomer(customers.filter(customer => customer.customerName.toLowerCase().includes(searchValue.toLowerCase()) || customer.customerNumber.includes(searchValue)));
        } else {
            setFilteredCustomer(customers);
        }
    }, [searchValue, customers]);

    function amount() {
        setSortBy('amount');
        setFilteredCustomer(customers.sort((a, b) => b.totalOfAllOrders - a.totalOfAllOrders));
    }

    function nbOfOrders() {
        setSortBy('nbOfOrders');
        setFilteredCustomer(customers.sort((a, b) => b.numberOfOrders - a.numberOfOrders));
    }

    function lastModified() {
        setSortBy('lastModified');
        const sortedCustomers = customers.slice().sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
        setFilteredCustomer(sortedCustomers);
    }

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (customers && customers.length < 1) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='no-items-message'>
                    No registered customers yet.
                </ErrorMessage>
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
                        placeholder='name or phone nb.'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <i className="flex-center fa-solid fa-magnifying-glass fa-times" onClick={() => setSearchValue('')}></i>
                </div>
                <div className="flex-between mt-l mb-l">
                    <h3>{customers.length} REGISTERED CUSTOMERS</h3>
                    <div className="switch-customer">
                        <div className={sortBy === 'lastModified' ? 'switch-button active' : 'switch-button'} onClick={lastModified}>Last modified</div>
                        <div className={sortBy === 'amount' ? 'switch-button active' : 'switch-button'} onClick={amount}>Amount</div>
                        <div className={sortBy === 'nbOfOrders' ? 'switch-button active' : 'switch-button'} onClick={nbOfOrders}>Nb of orders</div>
                    </div>
                </div>
                <table className='orders-table'>
                    <AllCustomersThead />
                    {filteredCustomer.length > 0 ?
                        <tbody>
                            {filteredCustomer.map(customer => (
                                <SingleCustomer key={customer.id} customer={customer} />
                            ))}
                        </tbody>
                        :
                        ''
                    }
                </table>
                {filteredCustomer.length < 1 &&
                    <h2 className='not-found-product text-center'>There no customers related to
                        <span className='not-found-search-value'> " {searchValue} "</span>
                    </h2>
                }
            </div>
        )
    }

}

export default AllCustomers;
