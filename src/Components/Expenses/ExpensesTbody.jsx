import React from 'react';
import SingleExpense from './SingleExpense';
import { formatCurrency } from '../../functions/formatCurrency';
import { orderIdClass } from "../../Pages/AllSales";

function ExpensesTbody({ days, setExpenses, rawExpenses, setRawExpenses }) {

    const totalExpensesPerDay = (array) => {
        return array.reduce((totalExpensesPerDay, expense) => ((totalExpensesPerDay + Number(expense.expenseValue))), 0);
    }

    return (
        <div>
            <div className="w-full flex items-center my-4 bg-custom-dark-gray text-white rounded-md py-2 font-bold">
                <p className={orderIdClass}>-</p>
                <p className="flex-1 text-center">All Time</p>
                <p className="flex-1 text-center">-</p>
                <p className="flex-1 text-center">-</p>
                <p className="flex-1 text-center">{formatCurrency(totalExpensesPerDay(rawExpenses))}</p>
                <p className="flex-1 text-center">-</p>
            </div>
            <br />
            {days.map((day, i) => (
                <React.Fragment key={i}>
                    {i !== 0 && <br />}
                    <div key={i} className="w-full flex items-center bg-custom-light-gray py-2 rounded-md font-bold">
                        <p className={orderIdClass}>-</p>
                        <p className="flex-1 text-center">{day.date}</p>
                        <p className="flex-1 text-center">-</p>
                        <p className="flex-1 text-center">-</p>
                        <p className="flex-1 text-center">{formatCurrency(totalExpensesPerDay(day.expenses))}</p>
                        <p className="flex-1 text-center">-</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-1">
                        {day.expenses.map((expense, i) => (
                            <SingleExpense key={i}
                                expense={expense}
                                setExpenses={setExpenses}
                                rawExpenses={rawExpenses}
                                setRawExpenses={setRawExpenses} />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ExpensesTbody;
