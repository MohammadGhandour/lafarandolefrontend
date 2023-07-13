import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import Loader from '../Components/Loader';
import moment from 'moment';
import PAProdcutPerOrder from '../Components/AvergaeProgression/PAProductPerOrder';
import PAPricePerOrder from '../Components/AvergaeProgression/PAPricePerOrder';
import PAProfitPerOrder from '../Components/AvergaeProgression/PAProfitPerOrder';
import './PagesStyles/AverageProgression.css'

function AverageProgression() {

    const [loading, setLoading] = useState(true);
    const [grid1Fr, setGrid1Fr] = useState(false);
    const [suitableArrayOfOrders, setSuitableArrayOfOrders] = useState([]);

    useEffect(() => {
        axios.get(`${api}/orders/average-progression`, { headers: headers })
            .then(res => {

                let days = res.data.reduce((acc, object) =>
                    acc.includes(
                        moment(object.createdAt).day() &&
                        moment(object.createdAt).month() &&
                        moment(object.createdAt).year()
                    ) ?
                        acc : acc.concat(moment(object.createdAt).format('ll')),
                    []);

                days = days.reduce((acc, date) =>
                    acc.includes(date) ? acc : acc.concat(date),
                    []
                );

                let arrayOfObjectsPerDay = [];

                days.map(day => {
                    var singleDay = {};
                    singleDay['date'] = day;
                    singleDay['orders'] = [];
                    return arrayOfObjectsPerDay.push(singleDay);
                });

                function orders_dates_LT_day(day1, day2) {
                    return new Date(moment(day1).startOf('day').format('lll')) <= new Date(moment(day2).startOf('day').format('lll'))
                }

                arrayOfObjectsPerDay.map(day => {
                    // eslint-disable-next-line
                    return res.data.map(object => {
                        if (orders_dates_LT_day(object.createdAt, day.date)) {
                            day.orders.push(object);
                        }
                    })
                });

                let sortedArray = arrayOfObjectsPerDay;


                sortedArray.map(obj => {
                    const itemsSold = obj.orders.reduce((items, order) => ((items + order.itemsNumber)), 0);
                    const priceSold = obj.orders.reduce((items, order) => ((items + Number(order.total))), 0);
                    const profitSold = obj.orders.reduce((items, order) => ((items + Number(order.profit))), 0);
                    obj.averageProductPerOrder = Number((Number(itemsSold) / obj.orders.length).toFixed(2));
                    obj.averagePricePerOrder = Number(Number(priceSold / obj.orders.length).toFixed(2));
                    obj.averageProfitPerOrder = Number(Number(profitSold / obj.orders.length).toFixed(2));
                    setSuitableArrayOfOrders(sortedArray);
                    return sortedArray;
                });

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function options(ytitle) {
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: ytitle,
                        size: 24,
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    grid: {
                        display: false
                    }
                }
            }, plugins: {
                legend: {
                    display: false
                },
            }
        }
        return options;
    }

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='average-progression-full-page'>
                <button
                    className='primary-btn expand-collapse-btn'
                    onClick={() => setGrid1Fr(!grid1Fr)}>
                    {grid1Fr ? 'Collapse' : 'Expand'}
                </button>
                <div className={`lines-container ${grid1Fr && 'grid-1fr'}`}>
                    <PAProdcutPerOrder sortedArray={suitableArrayOfOrders} options={options('Product')} />
                    <PAPricePerOrder sortedArray={suitableArrayOfOrders} options={options('$')} />
                    <PAProfitPerOrder sortedArray={suitableArrayOfOrders} options={options('$')} />
                </div>
            </div>
        )
    }
}

export default AverageProgression;
