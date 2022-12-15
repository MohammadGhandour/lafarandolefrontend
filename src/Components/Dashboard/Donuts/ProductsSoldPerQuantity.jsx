import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { backgroundColors } from '../chartsUtils/backgroundColors';

function ProductsSoldPerQuantity({ rawProductsSold, itemsSold, totalItemsSold, donutsSortBy }) {
    const [productsSold, setProductsSold] = useState(rawProductsSold);

    useEffect(() => {

        let categoriesPerQuantity = [];

        let basicCategories = rawProductsSold?.reduce((acc, product) =>
            acc.includes(product.category) ? acc : acc.concat(product.category),
            []
        );

        basicCategories.map(category => {
            var singleCategory = {};
            singleCategory['category'] = category;
            singleCategory['quantitySold'] = 0;
            singleCategory['priceSold'] = 0;
            return categoriesPerQuantity.push(singleCategory);
        });

        categoriesPerQuantity.map(category => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.category === category.category) {
                    category.quantitySold += product.quantitySold;
                    category.priceSold += Math.round(Number(product.price) * product.quantitySold);
                }
            })
        });

        if (donutsSortBy === 'quantitySold') {
            categoriesPerQuantity.sort((a, b) => b.quantitySold - a.quantitySold);

            const firstTenCategories = categoriesPerQuantity.splice(0, 10);
            const otherCategories = categoriesPerQuantity;
            const otherCategoriesQuantitySold = otherCategories.reduce((totalQuantity, product) => ((totalQuantity + product.quantitySold)), 0);

            categoriesPerQuantity = firstTenCategories;

            firstTenCategories.push({
                category: "Others",
                quantitySold: otherCategoriesQuantitySold
            });

            setProductsSold({
                labels: categoriesPerQuantity.map(category => category.category),
                datasets: [
                    {
                        label: "Categories",
                        data: categoriesPerQuantity.map(category => category.quantitySold),
                        backgroundColor: backgroundColors
                    },
                ]
            });
        } else {
            categoriesPerQuantity.sort((a, b) => b.priceSold - a.priceSold);

            const firstTenCategories = categoriesPerQuantity.splice(0, 10);
            const otherCategories = categoriesPerQuantity;
            const otherCategoriesPriceSold = otherCategories.reduce((totalPrice, product) => ((totalPrice + product.priceSold)), 0);

            categoriesPerQuantity = firstTenCategories;

            firstTenCategories.push({
                category: "Others",
                priceSold: otherCategoriesPriceSold
            });
            setProductsSold({
                labels: categoriesPerQuantity.map(category => category.category),
                datasets: [
                    {
                        label: "Categories",
                        data: categoriesPerQuantity.map(category => category.priceSold),
                        backgroundColor: backgroundColors
                    },
                ]
            });
        }
    }, [donutsSortBy, rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSold.labels) {
        return (
            <div>Loading...</div>
        )
    } else if (donutsSortBy === 'quantitySold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSold}
                    plugins={plugins}
                    options={options(itemsSold, 'Products sold per quantity')} />
            </div>
        )
    } else if (donutsSortBy === 'priceSold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSold}
                    plugins={plugins}
                    options={options(itemsSold, 'Products sold per price', totalItemsSold)} />
            </div>
        )
    }
}

export default ProductsSoldPerQuantity;
