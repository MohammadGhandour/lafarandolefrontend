import React, { useState } from 'react';
import { expensesCategories } from '../../Arrays/Expenses/expensesCategories';
import ErrorMessage from '../ErrorMessage';
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';
import styles from "../../styles";

function AddExpenseForm({ setExpenses, rawExpenses, setRawExpenses }) {

    const [expenseValue, setExpenseValue] = useState(0);
    const [currencyExchange, setCurrencyExchange] = useState(0);
    const [comment, setComment] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState('');

    function submit(e) {
        e.preventDefault();
        let finalExpenseValue = expenseValue;
        if (currency === 'USD') {
            finalExpenseValue = expenseValue;
        } else {
            finalExpenseValue = expenseValue / currencyExchange
        }
        const data = {
            expenseValue: Number(finalExpenseValue).toFixed(2),
            currencyExchange,
            comment,
            currency,
            category: expenseCategory
        };

        axios.post(`${api}/expenses`, data, { headers: headers })
            .then(res => {
                const newExpense = res.data;
                rawExpenses.unshift(newExpense);
                const newExpenses = rawExpenses;
                setRawExpenses(newExpenses);
                setExpenses(sortArrayOfObjectsPerDay(newExpenses, 'expenses'));

                setEmptyFields([]);
                setExpenseCategory('');
                setExpenseValue(0);
                setComment('');
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) {
                    setEmptyFields(err.response.data.emptyFields);
                } else if (err.message === 'Network Error') {
                    console.log(err.message);
                    setError('An error occured while communicating with the server.');
                }
            })
    }

    return (
        <div className="w-full">
            <form className="w-full flex flex-col gap-2 mb-8" onSubmit={submit}>
                <input
                    type="number"
                    autoComplete='off'
                    name='expenseValue'
                    placeholder='Expense'
                    className={`${styles.inputClasses} ${emptyFields && emptyFields.includes('expenseValue') ? 'error-input' : ''}`}
                    value={expenseValue ? expenseValue : ''}
                    onChange={(e) => setExpenseValue(e.target.value)} />
                <select
                    name="currency"
                    value={currency}
                    className={`${styles.inputClasses} ${emptyFields && emptyFields.includes('expenseValue') ? 'error-input' : ''}`}
                    onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="LBP">LBP</option>
                </select>
                {currency === 'LBP' &&
                    <input
                        type="number"
                        autoComplete='off'
                        name='currencyExchange'
                        placeholder='$rate'
                        className={`${styles.inputClasses} ${emptyFields && emptyFields.includes('currencyExchange') ? 'error-input' : ''}`}
                        value={currencyExchange ? currencyExchange : ''}
                        onChange={(e) => setCurrencyExchange(e.target.value)} />
                }
                <input
                    type="text"
                    autoComplete='off'
                    name='comment'
                    placeholder='Comment'
                    className={`${styles.inputClasses}`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                <select
                    name="category"
                    value={expenseCategory}
                    className={`${styles.inputClasses} ${emptyFields && emptyFields.includes('category') ? 'error-input' : ''}`}
                    onChange={(e) => setExpenseCategory(e.target.value)}>
                    <option value=''>Category</option>
                    {expensesCategories.map((category, i) => (
                        <option value={category} key={i}>{category}</option>
                    ))}
                </select>
                <button type='submit' className={`${styles.blackButton} py-3`}>Add expense</button>
            </form>
            {error && <ErrorMessage classes='general-error mt-l'>{error}</ErrorMessage>}
        </div>
    )
}

export default AddExpenseForm;
