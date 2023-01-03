import React from 'react';
import moment from 'moment';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { formatCurrency } from '../../functions/formatCurrency';

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
        <tr className='single-expense-in-table'>
            <th>{expense.id}</th>
            <th>{moment(expense.createdAt).format('lll')}</th>
            <th>{expense.category}</th>
            <th className='expense-comment'>{expense.comment}</th>
            <th className='expense-value-in-table'>{formatCurrency(expense.expenseValue)}</th>
            <th className='delete-btn-in-table' onClick={deleteExpense}><i className='fa-solid fa-trash'></i></th>
        </tr>
    )
}

export default SingleExpense;
