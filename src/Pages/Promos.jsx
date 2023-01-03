import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { formatCurrency } from '../functions/formatCurrency';
import './PagesStyles/Promos.css';

function Promos() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [arrayOfPromoCodes, setArrayOfPromoCodes] = useState([]);

    useEffect(() => {
        axios.get(`${api}/orders/ordersForPromo`, { headers: headers })
            .then(res => {
                const orders = res.data;
                const promoCodes = orders.reduce((acc, order) =>
                    acc.includes(order.promoCode) ? acc : acc.concat(order.promoCode),
                    []
                );
                let arrayOfPromoCodes = [];
                promoCodes.map(code => {
                    var singleCode = {};
                    singleCode['promoCode'] = code;
                    singleCode['numberOfUse'] = 0;
                    singleCode['total'] = 0;
                    singleCode['profit'] = 0;
                    return arrayOfPromoCodes.push(singleCode);
                });
                arrayOfPromoCodes.map(object => {
                    // eslint-disable-next-line
                    return orders.map(order => {
                        if (order.promoCode === object.promoCode) {
                            object.numberOfUse += 1;
                            object.total += Number(order.total);
                            object.profit += Number(order.profit);
                        }
                    })
                });
                arrayOfPromoCodes.sort((a, b) => b.total - a.total);
                setArrayOfPromoCodes(arrayOfPromoCodes);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
                setLoading(false);
            })
    }, []);

    const getTotalOfUse = (arrayOfPromoCodes) => {
        return arrayOfPromoCodes.reduce((totalNbOfUse, object) => ((totalNbOfUse + object.numberOfUse)), 0);
    };

    const getTotal = (arrayOfPromoCodes) => {
        return arrayOfPromoCodes.reduce((total, object) => ((total + object.total)), 0);
    };

    const getProfit = (arrayOfPromoCodes) => {
        return arrayOfPromoCodes.reduce((profit, object) => ((profit + object.profit)), 0);
    };

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <ErrorMessage classes='general-error'>{error}</ErrorMessage>
        )
    }
    return (
        <div className='full-page promos-page'>
            <table>
                <thead className='thead'>
                    <tr>
                        <th>Promo Code</th>
                        <th>Nb of use</th>
                        <th>Total</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayOfPromoCodes.map((promo, i) => (
                        <tr key={i}>
                            <td className='order-profit'>{promo.promoCode}</td>
                            <td>{promo.numberOfUse}</td>
                            <td>{formatCurrency(promo.total)}</td>
                            <td className='back-green-profit'>{formatCurrency(promo.profit)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>-</th>
                        <th>{getTotalOfUse(arrayOfPromoCodes)}</th>
                        <th>{formatCurrency(getTotal(arrayOfPromoCodes))}</th>
                        <th className='back-green-profit'>{formatCurrency(getProfit(arrayOfPromoCodes))}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Promos;
