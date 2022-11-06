import React, { useEffect } from 'react'

function AllSalesSearchInput({ unfilteredOrders, setFilteredOrders, setSearchValue, searchValue, setSortBy }) {

    useEffect(() => {
        setSortBy('default');
        if (unfilteredOrders && unfilteredOrders.length > 0) {
            setFilteredOrders(unfilteredOrders.filter(order => order.customerName.toLowerCase().includes(searchValue.toLowerCase()) || order.id.toString().includes(searchValue)))
        }
    }, [searchValue, unfilteredOrders, setFilteredOrders, setSortBy]);

    return (
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
    )
}

export default AllSalesSearchInput;
