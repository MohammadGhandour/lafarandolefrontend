import React, { useEffect, useState } from 'react'
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { backgroundColors } from '../chartsUtils/backgroundColors';

function ProductsSoldPerBrand({ rawProductsSold, itemsSold }) {

    const [productsSoldPerBrand, setProductsSoldPerBrand] = useState([]);

    useEffect(() => {
        let quantityPerBrand = [];

        let brands = rawProductsSold.reduce((acc, product) =>
            acc.includes(product.brand) ? acc : acc.concat(product.brand),
            []
        );

        brands.map(brand => {
            var singleBrand = {};
            singleBrand['brand'] = brand.charAt(0).toUpperCase() + brand.slice(1);
            singleBrand['quantitySold'] = 0;
            return quantityPerBrand.push(singleBrand);
        });


        quantityPerBrand.map(brand => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.brand === brand.brand.toLowerCase()) {
                    brand.quantitySold += product.quantitySold;
                }
            })
        });

        quantityPerBrand.sort((a, b) => b.quantitySold - a.quantitySold);

        const firstTenBrands = quantityPerBrand.splice(0, 10);
        const otherBrands = quantityPerBrand;
        const otherBrandsQuantitySold = otherBrands.reduce((totalQuantity, product) => ((totalQuantity + product.quantitySold)), 0);

        firstTenBrands.push({ brand: "Others", quantitySold: otherBrandsQuantitySold });
        quantityPerBrand = firstTenBrands;

        setProductsSoldPerBrand({
            labels: quantityPerBrand.map(brand => brand.brand),
            datasets: [
                {
                    label: "Brands",
                    data: quantityPerBrand.map(brand => brand.quantitySold),
                    backgroundColor: backgroundColors
                }
            ]
        });
    }, [rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSoldPerBrand.labels) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerBrand}
                    plugins={plugins}
                    options={options(itemsSold, 'Products sold per brand', undefined, undefined)} />
            </div>
        )
    }
}

export default ProductsSoldPerBrand;
