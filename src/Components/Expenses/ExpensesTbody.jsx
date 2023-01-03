import React from 'react';
import SingleExpense from './SingleExpense';
import { formatCurrency } from '../../functions/formatCurrency';

function ExpensesTbody({ days, setExpenses, rawExpenses, setRawExpenses }) {

    const totalExpensesPerDay = (array) => {
        return array.reduce((totalExpensesPerDay, expense) => ((totalExpensesPerDay + Number(expense.expenseValue))), 0);
    }

    return (
        <tbody>
            <tr className='all-time-tr'>
                <th>-</th>
                <th>All Time</th>
                <th>-</th>
                <th>-</th>
                <th className='expense-value-in-table'>{formatCurrency(totalExpensesPerDay(rawExpenses))}</th>
                <th>-</th>
            </tr>
            <tr className='none-tr'>
                <th><br /></th>
            </tr>
            {days.map((day, i) => (
                <React.Fragment key={i}>
                    {i !== 0 &&
                        <tr className='none-tr'>
                            <th><br /></th>
                        </tr>
                    }
                    <tr key={i} className='single-day-in-table'>
                        <th>-</th>
                        <th>{day.date}</th>
                        <th>-</th>
                        <th>-</th>
                        <th className='expense-value-in-table'>{formatCurrency(totalExpensesPerDay(day.expenses))}</th>
                        <th className='expense-value-in-table'>-</th>
                    </tr>
                    {day.expenses.map((expense, i) => (
                        <SingleExpense key={i}
                            expense={expense}
                            setExpenses={setExpenses}
                            rawExpenses={rawExpenses}
                            setRawExpenses={setRawExpenses} />
                    ))}
                </React.Fragment>
            ))}
        </tbody>
    )
}

export default ExpensesTbody;
