import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { api } from '../Config/Config';
import Loader from '../Components/Loader';
import './PagesStyles/Statistics.css';
import { headers } from '../Config/Headers';
import { useRef } from 'react';
import StatisticsAverages from '../Components/Dashboard/StatisticsAverages';
import BarCharts from '../Components/Dashboard/BarCharts';
import Donuts from '../Components/Dashboard/Donuts/Donuts';
import ErrorMessage from '../Components/ErrorMessage';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const orders = useRef([]);

    useEffect(() => {
        axios.get(`${api}/orders/chart`, { headers: headers })
            .then(res => {
                orders.current = res.data;
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data.error)
                } else if (err.message === 'Network Error') {
                    setError('An error occured while communicating with the server.');
                }
                setLoading(false);
            })
    }, []);
    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='general-error'>{error}</ErrorMessage>
            </div>
        )
    } if (!loading && orders.current.length > 0) {
        return (
            <>
                <div className='full-page statistics-page flex-center'>
                    <StatisticsAverages orders={orders} />
                    <BarCharts orders={orders} />
                    <h2>Donuts</h2>
                    <Donuts orders={orders} />
                </div>
            </>
        )
    } else {
        return (
            <div className='full-page'>No orders yet</div>
        )
    }
}

export default Dashboard;
