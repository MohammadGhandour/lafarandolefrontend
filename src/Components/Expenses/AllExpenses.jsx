import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import Loader from '../../Components/Loader'
import ExpensesThead from './ExpensesThead';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';
import ExpensesTbody from './ExpensesTbody';
import ErrorMessage from '../ErrorMessage';

function AllExpenses({ expenses, setExpenses, rawExpenses, setRawExpenses }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${api}/expenses`, { headers: headers })
            .then(res => {
                setRawExpenses(res.data);
                setExpenses(sortArrayOfObjectsPerDay(res.data, 'expenses'));
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
    }, [setExpenses, setRawExpenses]);

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='general-error mt-l'>{error}</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className='expense'>
                <h3 className='products-length'>{rawExpenses.length} REGISTERED EXPENSES</h3>
                {expenses.length > 0 &&
                    <div className="table-wrapper">
                        <table className='expenses-table'>
                            <ExpensesThead />
                            <ExpensesTbody
                                days={expenses}
                                setExpenses={setExpenses}
                                rawExpenses={rawExpenses}
                                setRawExpenses={setRawExpenses} />
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default AllExpenses;
