import React, { useState } from 'react';
import { expensesCategories } from '../../Arrays/Expenses/expensesCategories';
import UIButton from '../FormComponents/UIButton';
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { sortArrayOfObjectsPerDay } from '../../functions/sortArrayOfObjectsPerDay';

function AddExpenseForm({ expenses, setExpenses, rawExpenses, setRawExpenses }) {

    const [expenseValue, setExpenseValue] = useState(0);
    const [currencyExchange, setCurrencyExchange] = useState(0);
    const [comment, setComment] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

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
                if (err.response.data.emptyFields) {
                    setEmptyFields(err.response.data.emptyFields);
                }
            })
    }

    return (
        <form className='expenses-form flex gap-m' id='expensesForm' onSubmit={submit}>
            <div className="form-group flex-center gap-m">
                <input
                    type="number"
                    autoComplete='off'
                    name='expenseValue'
                    placeholder='expense'
                    className={emptyFields && emptyFields.includes('expenseValue') ? 'expense-value-input error-input' : 'expense-value-input'}
                    value={expenseValue ? expenseValue : ''}
                    onChange={(e) => setExpenseValue(e.target.value)} />
                <select
                    name="currency"
                    value={currency}
                    className={emptyFields && emptyFields.includes('currency') ? 'error-input' : ''}
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
                        className={emptyFields && emptyFields.includes('currencyExchange') ? 'expense-exchange-input error-input' : 'expense-exchange-input'}
                        value={currencyExchange ? currencyExchange : ''}
                        onChange={(e) => setCurrencyExchange(e.target.value)} />
                }
            </div>
            <input
                type="text"
                autoComplete='off'
                name='comment'
                placeholder='comment'
                className='expense-comment-input'
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
            <select
                name="category"
                value={expenseCategory}
                className={emptyFields && emptyFields.includes('category') ? 'error-input' : ''}
                onChange={(e) => setExpenseCategory(e.target.value)}>
                <option value=''>category</option>
                {expensesCategories.map((category, i) => (
                    <option value={category} key={i}>{category}</option>
                ))}
            </select>
            <UIButton>Add expense</UIButton>
        </form>
    )
}

export default AddExpenseForm;
