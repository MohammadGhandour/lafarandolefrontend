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
        <div className="w-full overflow-x-auto">
            <div className="w-full flex-col flex mt-4 min-w-[800px]">
                <div className="w-full flex items-center font-bold bg-custom-light-gray rounded-md py-2 mb-8">
                    <p className="flex-1 text-center">Promo Code</p>
                    <p className="flex-1 text-center">Nb of use</p>
                    <p className="flex-1 text-center">Total</p>
                    <p className="flex-1 text-center">Profit</p>
                </div>
                <div className="flex flex-col gap-2">
                    {arrayOfPromoCodes.map((promo, i) => (
                        <div key={i} className="w-full flex items-center bg-custom-gray rounded-md overflow-hidden hover:bg-[#eee]">
                            <p className="flex-1 text-center">{promo.promoCode}</p>
                            <p className="flex-1 text-center">{promo.numberOfUse}</p>
                            <p className="flex-1 text-center">{formatCurrency(promo.total)}</p>
                            <p className="flex-1 text-center py-2 bg-custom-green text-white">{formatCurrency(promo.profit)}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center bg-custom-light-gray overflow-hidden rounded-md mt-8 font-bold">
                    <p className="flex-1 text-center">-</p>
                    <p className="flex-1 text-center">{getTotalOfUse(arrayOfPromoCodes)}</p>
                    <p className="flex-1 text-center">{formatCurrency(getTotal(arrayOfPromoCodes))}</p>
                    <p className="flex-1 text-center py-2 bg-custom-green text-white">{formatCurrency(getProfit(arrayOfPromoCodes))}</p>
                </div>
            </div>
        </div>
    )
}

export default Promos;
