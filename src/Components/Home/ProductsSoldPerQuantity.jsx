import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from './chartsUtils/donutsOptions';
import { backgroundColors } from './chartsUtils/backgroundColors';

function ProductsSoldPerQuantity({ rawProductsSold, itemsSold }) {
    const [productsSold, setProductsSold] = useState(rawProductsSold);

    useEffect(() => {
        let categoriesPerQuantity = [];

        let basicCategories = productsSold.reduce((acc, product) =>
            acc.includes(product.category) ? acc : acc.concat(product.category),
            []
        );

        basicCategories.map(category => {
            var singleCategory = {};
            singleCategory['category'] = category;
            singleCategory['quantitySold'] = 0;
            return categoriesPerQuantity.push(singleCategory);
        });
        categoriesPerQuantity.map(category => {
            // eslint-disable-next-line
            return productsSold.map(product => {
                if (product.category === category.category) {
                    category.quantitySold += product.quantitySold;
                }
            })
        });
        categoriesPerQuantity.sort((a, b) => b.quantitySold - a.quantitySold);
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
        // eslint-disable-next-line
    }, []);

    const plugins = [ChartDataLabels];

    if (!productsSold.labels) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <Doughnut
                data={productsSold}
                plugins={plugins}
                options={options(itemsSold, 'Products sold per quantity')}
                height={400}
                width={400} />
        )
    }
}

export default ProductsSoldPerQuantity;
