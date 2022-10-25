import React from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { useEffect } from 'react';
import { useState } from 'react';

function ProductsSoldPerGender({ rawProductsSold, itemsSold }) {

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
            return quantityPerGender.push(singleGender);
        });


        quantityPerGender.map(gender => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.gender === gender.gender) {
                    gender.quantitySold += product.quantitySold;
                }
            })
        });

        quantityPerGender.sort((a, b) => b.quantitySold - a.quantitySold);

        let backgroundColors = [];
        for (let i = 0; i < quantityPerGender.length; i++) {
            if (quantityPerGender[i].gender === 'Unisex') backgroundColors.push('#D7002B');
            if (quantityPerGender[i].gender === 'Boy') backgroundColors.push('#0EA5E9');
            if (quantityPerGender[i].gender === 'Girl') backgroundColors.push('#F8B7CD');
            if (quantityPerGender[i].gender === 'Women') backgroundColors.push('#46296E');
        }

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
    }, [rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSoldPerGender.labels) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerGender}
                    plugins={plugins}
                    options={options(itemsSold, 'Products sold per gender', undefined, undefined)} />
            </div>
        )
    }
}

export default ProductsSoldPerGender;
