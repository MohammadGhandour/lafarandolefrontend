import React from 'react';
import styles from "../../styles";

function AllSalesSearchInput({ setSearchValue, searchValue, setSortBy }) {
    return (
        <div className="w-full flex relative">
            {/* <label htmlFor='searchInput' className={`${styles.blackButton} flex items-center justify-center rounded-r-none`}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </label> */}
            <input
                type='text'
                className={`${styles.inputClasses} !rounded-r-none !outline-none focus:!outline-none`}
                id="searchInput"
                autoFocus
                autoComplete="off"
                placeholder="Search by id or name or phone nb."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className={`${styles.redButton} rounded-l-none px-6`}><i className="flex-center fa-solid fa-magnifying-glass fa-times" onClick={() => setSearchValue('')}></i></button>
        </div>
    )
}

export default AllSalesSearchInput;
