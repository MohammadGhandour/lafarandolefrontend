import React from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { useEffect } from 'react';
import { useState } from 'react';

function ProductsSoldPerGender({ rawProductsSold, itemsSold, totalItemsSold, donutsSortBy }) {

    const [productsSoldPerGender, setProductsSoldPerGender] = useState([]);

    useEffect(() => {
        let quantityPerGender = [];

        let genders = rawProductsSold.reduce((acc, product) =>
            acc.includes(product.gender) ? acc : acc.concat(product.gender),
            []
        );

        genders.map(gender => {
            var singleGender = {};
            singleGender['gender'] = gender;
            singleGender['quantitySold'] = 0;
            singleGender['priceSold'] = 0;
            return quantityPerGender.push(singleGender);
        });


        quantityPerGender.map(gender => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.gender === gender.gender) {
                    gender.quantitySold += product.quantitySold;
                    gender.priceSold += Math.round(Number(product.price) * Number(product.quantitySold));;
                }
            })
        });

        let backgroundColors = [];
        for (let i = 0; i < quantityPerGender.length; i++) {
            if (quantityPerGender[i].gender === 'Unisex') backgroundColors.push('#D7002B');
            if (quantityPerGender[i].gender === 'Women') backgroundColors.push('#0EA5E9');
            if (quantityPerGender[i].gender === 'Girl') backgroundColors.push('#F8B7CD');
            if (quantityPerGender[i].gender === 'Boy') backgroundColors.push('#46296E');
        }

        if (donutsSortBy === 'quantitySold') {
            quantityPerGender.sort((a, b) => b.quantitySold - a.quantitySold);
            setProductsSoldPerGender({
                labels: quantityPerGender.map(gender => gender.gender),
                datasets: [
                    {
                        label: "Genders",
                        data: quantityPerGender.map(gender => gender.quantitySold),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        } else {
            quantityPerGender.sort((a, b) => b.priceSold - a.priceSold);
            setProductsSoldPerGender({
                labels: quantityPerGender.map(gender => gender.gender),
                datasets: [
                    {
                        label: "Genders",
                        data: quantityPerGender.map(gender => gender.priceSold),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        }
    }, [donutsSortBy, rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSoldPerGender.labels) {
        return (
            <div>Loading...</div>
        )
    } else if (donutsSortBy === 'quantitySold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerGender}
                    plugins={plugins}
                    options={options(itemsSold, 'Quantity sold per gender', undefined, undefined)} />
            </div>
        )
    } else if (donutsSortBy === 'priceSold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerGender}
                    plugins={plugins}
                    options={options(itemsSold, 'Price sold per gender', totalItemsSold, undefined)} />
            </div>
        )
    }
}

export default ProductsSoldPerGender;
