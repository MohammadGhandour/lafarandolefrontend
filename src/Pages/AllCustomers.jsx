import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AllCustomersThead from '../Components/AllCustomers/AllCustomersThead';
import SingleCustomer from '../Components/AllCustomers/SingleCustomer';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import "./PagesStyles/Customers.css"

function AllCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCustomer, setFilteredCustomer] = useState([]);

    useEffect(() => {
        axios.get(`${api}/customers`, { headers: headers })
            .then(res => {
                setCustomers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setFilteredCustomer(customers.filter(customer => customer.customerName.includes(searchValue) || customer.customerNumber.includes(searchValue)));
    }, [searchValue, customers]);

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
                </div>
                <h3 style={{ marginTop: 20 }}>{customers.length} REGISTERED CUSTOMERS</h3>
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
