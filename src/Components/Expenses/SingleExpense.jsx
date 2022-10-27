import React from 'react';
import moment from 'moment';

function SingleExpense({ expense }) {
    return (
        <tr className='single-expense-in-table'>
            <th>{expense.id}</th>
            <th>{moment(expense.createdAt).format('lll')}</th>
            <th>{expense.category}</th>
            <th className='expense-comment'>{expense.comment}</th>
            <th className='expense-value-in-table'>$ {expense.expenseValue}</th>
        </tr>
    )
}

export default SingleExpense;
