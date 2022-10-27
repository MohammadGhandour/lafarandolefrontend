import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import Loader from '../../Components/Loader'
import ExpensesThead from './ExpensesThead';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';
import ExpensesTbody from './ExpensesTbody';

function AllExpenses({ expenses, setExpenses, rawExpenses, setRawExpenses }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${api}/expenses`, { headers: headers })
            .then(res => {
                setRawExpenses(res.data);
                setExpenses(sortArrayOfObjectsPerDay(res.data, 'expenses'));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [setExpenses, setRawExpenses]);

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='expense'>
                <h3 className='products-length'>{rawExpenses.length} REGISTERED EXPENSES</h3>
                {expenses.length > 0 &&
                    <table className='expenses-table'>
                        <ExpensesThead />
                        <ExpensesTbody days={expenses} rawExpenses={rawExpenses} />
                    </table>
                }
            </div>
        )
    }
}

export default AllExpenses;
