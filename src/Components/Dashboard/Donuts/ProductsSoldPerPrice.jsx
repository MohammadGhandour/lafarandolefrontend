import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { backgroundColors } from '../chartsUtils/backgroundColors';

function ProductsSoldPerPrice({ rawProductsSold, itemsSold, totalItemsSold }) {

    const [productsSoldPerPrice, setProductsSoldPerPrice] = useState([]);

    useEffect(() => {
        let categoriesPerPrice = [];
        let basicCategories = rawProductsSold.reduce((acc, product) =>
            acc.includes(product.category) ? acc : acc.concat(product.category),
            []
        );
        let basicCategoriesForPrice = basicCategories;

        basicCategoriesForPrice.map(category => {
            var singleCategory = {};
            singleCategory['category'] = category;
            singleCategory['priceSold'] = 0;
            return categoriesPerPrice.push(singleCategory);
        });
        categoriesPerPrice.map(category => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.category === category.category) {
                    category.priceSold += Math.round(Number(product.price) * product.quantitySold);
                }
            })
        });
        categoriesPerPrice.sort((a, b) => b.priceSold - a.priceSold);
        setProductsSoldPerPrice({
            labels: categoriesPerPrice.map(category => category.category),
            datasets: [
                {
                    label: "Categories",
                    data: categoriesPerPrice.map(category => category.priceSold),
                    backgroundColor: backgroundColors
                },
            ]
        });
    }, [rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSoldPerPrice.labels) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerPrice}
                    plugins={plugins}
                    options={options(itemsSold, 'Products sold per price', totalItemsSold)} />
            </div>
        )
    }
}

export default ProductsSoldPerPrice;
