import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { api } from '../Config/Config';
import Loader from '../Components/Loader';
import './PagesStyles/Statistics.css';
import { headers } from '../Config/Headers';
import { useRef } from 'react';
import CategoryStatistics from '../Components/Home/CategoryStatistics';
import StatisticsAverages from '../Components/Home/StatisticsAverages';
import BarCharts from '../Components/Home/BarCharts';

function Home() {
    const [loading, setLoading] = useState(true);

    const orders = useRef([]);

    useEffect(() => {
        axios.get(`${api}/orders/chart`, { headers: headers })
            .then(res => {
                orders.current = res.data;
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    if (!loading && orders.current.length > 0) {
        return (
            <>
                <div className='full-page statistics-page flex-center'>
                    <StatisticsAverages orders={orders} />
                    <BarCharts orders={orders} />
                    <h2>Donuts</h2>
                    <CategoryStatistics orders={orders} />
                </div>
            </>
        )
    } else if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>No orders yet</div>
        )
    }
}

export default Home;
