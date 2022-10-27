import React, { useState } from 'react';
import AddExpenseForm from '../Components/Expenses/AddExpenseForm';
import AllExpenses from '../Components/Expenses/AllExpenses';
import './PagesStyles/Expenses.css';

function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [rawExpenses, setRawExpenses] = useState([]);

    return (
        <div className='full-page'>
            <AddExpenseForm
                expenses={expenses}
                setExpenses={setExpenses}
                rawExpenses={rawExpenses}
                setRawExpenses={setRawExpenses} />
            <AllExpenses
                expenses={expenses}
                setExpenses={setExpenses}
                rawExpenses={rawExpenses}
                setRawExpenses={setRawExpenses} />
        </div>
    )
}

export default Expenses;
