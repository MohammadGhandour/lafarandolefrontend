import axios from "axios"
import React, { useEffect, useState } from "react"
import AllCustomersThead from "../Components/AllCustomers/AllCustomersThead";
import SingleCustomer from "../Components/AllCustomers/SingleCustomer";
import ErrorMessage from "../Components/ErrorMessage";
import Loader from "../Components/Loader";
import { api } from "../Config/Config";
import { headers } from "../Config/Headers";
import "./PagesStyles/Customers.css";
import moment from "moment";
import { useAdminContext } from "../Hooks/useAdminContext";
import styles from "../styles";

function AllCustomers() {

    const { admin } = useAdminContext();

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [filteredCustomer, setFilteredCustomer] = useState([]);
    const [sortBy, setSortBy] = useState("lastModified");
    const [rawCustomers, setRawCustomers] = useState([]);
    const [error, setError] = useState("");

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
                if (err.response.status === 404) {
                    setError(err.response.data.error)
                } else if (err.message === "Network Error") {
                    setError("An error occured while communicating with the server.");
                }
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
        setFilteredCustomer(customers.sort((a, b) => b.totalOfAllOrders - a.totalOfAllOrders));
    }
    function nbOfOrders() {
        setFilteredCustomer(customers.sort((a, b) => b.numberOfOrders - a.numberOfOrders));
    }
    function lastModified() {
        const sortedCustomers = customers.slice().sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
        setFilteredCustomer(sortedCustomers);
    }

    function handleChange(e) {
        const sortby = e.target.value;
        setSortBy(sortby);
        if (sortby === "amount") amount();
        if (sortby === "lastModified") lastModified();
        if (sortby === "nbOfOrders") nbOfOrders();
        else return;
    }

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className="full-page">
                <ErrorMessage classes="general-error">{error}</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className="w-full">
                <div className="w-full flex items-center">
                    {/* <label htmlFor="searchInput" className={`${styles.blackButton} py-3 rounded-r-none`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </label> */}
                    <input
                        type="text"
                        className={`${styles.inputClasses} focus:!outline-none rounded-r-none`}
                        autoFocus
                        autoComplete="off"
                        placeholder="name or phone nb."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button className={`${styles.redButton} !py-4 px-6 rounded-l-none`} onClick={() => setSearchValue("")}>
                        <i className={`fa-solid fa-times`}></i>
                    </button>
                </div>
                <div className="flex items-center justify-end my-4">
                    {/* <h3>{customers.length} REGISTERED CUSTOMERS</h3> */}
                    <select
                        name="sortby"
                        id="sortby"
                        className={`${styles.inputClasses} max-w-[180px]`}
                        value={sortBy}
                        onChange={handleChange}>
                        <option value="lastModified">Last modified</option>
                        <option value="amount">Amount</option>
                        <option value="nbOfOrders">Nb of orders</option>
                    </select>
                </div>
                <div className="w-full overflow-x-auto">
                    <div className="w-full flex-col flex mt-4 min-w-[800px]">
                        <AllCustomersThead admin={admin} />
                        {filteredCustomer.length > 0 ?
                            <div className="w-full flex flex-col gap-1">
                                {filteredCustomer.map(customer => (
                                    <SingleCustomer key={customer.id} customer={customer} admin={admin} />
                                ))}
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
                {filteredCustomer.length < 1 &&
                    <h2 className="not-found-product text-center">There no customers related to
                        <span className="not-found-search-value"> " {searchValue} "</span>
                    </h2>
                }
            </div>
        )
    }

}

export default AllCustomers;
