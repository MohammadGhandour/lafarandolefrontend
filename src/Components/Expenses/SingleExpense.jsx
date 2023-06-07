import React from 'react';
import moment from 'moment';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';
import { orderIdClass } from "../../Pages/AllSales";

function SingleExpense({ expense, setExpenses, rawExpenses, setRawExpenses }) {

    function deleteExpense() {
        if (window.confirm(`Are you sure you want to delete this expense ?`)) {
            axios.delete(`${api}/expenses/${expense.id}`, { headers: headers })
                .then(res => {
                    console.log(res);
                    const expenseToDelete = expense;
                    const newExpenses = rawExpenses.filter(expense => expense.id !== expenseToDelete.id);
                    setRawExpenses(newExpenses);
                    setExpenses(sortArrayOfObjectsPerDay(newExpenses, 'expenses'));
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            return
        }
    }

    return (
        <div className="w-full flex items-center bg-custom-gray rounded-md overflow-hidden">
            <p className={orderIdClass}>{expense.id}</p>
            <p className="flex-1 text-center">{moment(expense.createdAt).format('lll')}</p>
            <p className="flex-1 text-center">{expense.category}</p>
            <p className="flex-1 text-center" >{expense.comment}</p>
            <p className="flex-1 text-center">{formatCurrency(expense.expenseValue)}</p>
            <p className="flex-1 text-center bg-crimson py-2 text-white cursor-pointer" onClick={deleteExpense}><i className='fa-solid fa-trash'></i></p>
        </div>
    )
}

export default SingleExpense;
