import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { sortArrayOfObjectsPerDay } from '../functions/sortArrayOfObjectsPerDay';
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import Loader from '../Components/Loader';

function AvergaeProgression() {

    const [averageProgressionData, setAverageProgressionData] = useState();
    const [loading, setLoading] = useState(true);
    const [requestParams, setRequestParams] = useState('');

    const params = useParams();

    useEffect(() => {
        switch (params.average) {
            case 'average-product-per-order':
                setRequestParams('orders');
                break;

            default:
                break;
        }
    }, [params.average]);

    useEffect(() => {
        if (requestParams) {
            axios.get(`${api}/${requestParams}`, { headers: headers })
                .then(res => {
                    const sortedArray = sortArrayOfObjectsPerDay(res.data, 'orders');
                    sortedArray.map(obj => {
                        const itemsSold = obj.orders.reduce((items, order) => ((items + order.itemsNumber)), 0);
                        obj.averageProductPerOrder = Number((Number(itemsSold) / obj.orders.length).toFixed(2));
                        return sortedArray;
                    });
                    setAverageProgressionData({
                        labels: sortedArray.map(obj => obj.date),
                        datasets: [
                            {
                                label: params.average,
                                data: sortedArray.map(obj => obj.averageProductPerOrder),
                                backgroundColor: '#B1DCFF',
                                fill: true,
                                borderColor: '#056DBE',
                                borderWidth: 2,
                                pointRadius: 0,
                                pointHoverRadius: 5,
                                pointHitRadius: 5
                            }
                        ]
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [params.average, requestParams]);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: '',
                    size: 24
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
        },
    }

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='bars-container'>
                <div className="bar-chart">
                    <Line data={averageProgressionData} options={options} />
                </div>
            </div>
        )
    }
}

export default AvergaeProgression;
