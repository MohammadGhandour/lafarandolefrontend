import React, { useEffect, useState } from 'react'
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { backgroundColors } from '../chartsUtils/backgroundColors';

function ProductsSoldPerBrand({ rawProductsSold, itemsSold, totalItemsSold, donutsSortBy }) {

    const [productsSoldPerBrand, setProductsSoldPerBrand] = useState([]);

    useEffect(() => {
        let productsSoldPerBrand = [];

        let brands = rawProductsSold.reduce((acc, product) =>
            acc.includes(product.brand) ? acc : acc.concat(product.brand),
            []
        );

        brands.map(brand => {
            var singleBrand = {};
            singleBrand['brand'] = brand.charAt(0).toUpperCase() + brand.slice(1);
            singleBrand['quantitySold'] = 0;
            singleBrand['priceSold'] = 0;
            return productsSoldPerBrand.push(singleBrand);
        });


        productsSoldPerBrand.map(brand => {
            // eslint-disable-next-line
            return rawProductsSold.map(product => {
                if (product.brand === brand.brand.toLowerCase()) {
                    brand.quantitySold += product.quantitySold;
                    brand.priceSold += Math.round(Number(product.price) * Number(product.quantitySold));
                }
            })
        });

        if (donutsSortBy === 'quantitySold') {
            productsSoldPerBrand.sort((a, b) => b.quantitySold - a.quantitySold);

            const firstTenBrands = productsSoldPerBrand.splice(0, 10);
            const otherBrands = productsSoldPerBrand;
            const otherBrandsQuantitySold = otherBrands.reduce((totalQuantity, product) => ((totalQuantity + product.quantitySold)), 0);

            firstTenBrands.push({ brand: "Others", quantitySold: otherBrandsQuantitySold });
            productsSoldPerBrand = firstTenBrands;

            setProductsSoldPerBrand({
                labels: productsSoldPerBrand.map(brand => brand.brand),
                datasets: [
                    {
                        label: "Brands",
                        data: productsSoldPerBrand.map(brand => brand.quantitySold),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        } else {
            productsSoldPerBrand.sort((a, b) => b.priceSold - a.priceSold);

            const firstTenBrands = productsSoldPerBrand.splice(0, 10);
            const otherBrands = productsSoldPerBrand;
            const otherBrandsPriceSold = otherBrands.reduce((totalQuantity, brand) => ((totalQuantity + brand.priceSold)), 0);

            firstTenBrands.push({ brand: "Others", priceSold: otherBrandsPriceSold });
            productsSoldPerBrand = firstTenBrands;

            setProductsSoldPerBrand({
                labels: productsSoldPerBrand.map(brand => brand.brand),
                datasets: [
                    {
                        label: "Brands",
                        data: productsSoldPerBrand.map(brand => brand.priceSold),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        }
    }, [donutsSortBy, rawProductsSold]);

    const plugins = [ChartDataLabels];

    if (!productsSoldPerBrand.labels) {
        return (
            <div>Loading...</div>
        )
    } else if (donutsSortBy === 'quantitySold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerBrand}
                    plugins={plugins}
                    options={options(itemsSold, 'Quantity sold per brand', undefined, undefined)} />
            </div>
        )
    } else if (donutsSortBy === 'priceSold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={productsSoldPerBrand}
                    plugins={plugins}
                    options={options(itemsSold, 'Price sold per brand', totalItemsSold, undefined)} />
            </div>
        )
    }
}

export default ProductsSoldPerBrand;
