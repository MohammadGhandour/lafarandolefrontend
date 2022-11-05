import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import SearchInput from '../Components/AllProducts/SearchInput';
import SelectCategory from '../Components/SelectCategory';
import SelectGender from '../Components/SelectGender';
import { api } from '../Config/Config';
import { useProductsContext } from "../Hooks/useProductsContext";
import "./PagesStyles/AllProducts.css";
import Thead from '../Components/AllProducts/Thead';
import SingleProductInTable from '../Components/AllProducts/SingleProductInTable';
import { headers } from '../Config/Headers';
import SelectSize from '../Components/SelectSize';
import SelectBrand from '../Components/SelectBrand';

function Products() {

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [allProductsCost, setAllProductsCost] = useState(0);
    // eslint-disable-next-line
    const [allProductsPrice, setAllProductsPrice] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${api}/products`, { headers: headers })
            .then(response => {
                let productsData = response.data;
                setProductsData(productsData);
                setLoading(false);

                let allProductsCostVar = productsData.reduce((allProductsCostVar, item) => (
                    (allProductsCostVar + (Number(item.cost) * Number(item.quantity)))
                ), 0);
                setAllProductsCost(allProductsCostVar);

                let allProductsPriceVar = productsData.reduce((allProductsCostVar, item) => (
                    (allProductsCostVar + (Number(item.price) * Number(item.quantity)))
                ), 0);
                setAllProductsPrice(allProductsPriceVar);
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
    }, [loading, setLoading]);

    const { products, dispatch } = useProductsContext();
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        size: '',
        brand: ''
    });

    useEffect(() => {
        dispatch({ type: "SET_PRODUCTS", payload: productsData })
        // eslint-disable-next-line
    }, [productsData, dispatch]);

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 50;

    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = products ? products.slice(indexOfLastProduct, indexOfLastProduct + productsPerPage) : null;

    const pageNumbers = products ? Math.ceil(products.length / productsPerPage) : 0;

    function changePage({ selected }) {
        setCurrentPage(selected)
    }

    useEffect(() => {
        const filtersKeys = Object.keys(filters);
        let filledFilters = [];
        filtersKeys.map(filterKey => {
            if (filters[filterKey]) filledFilters.push(filterKey);
            return filledFilters
        });

        let categorisedProducts = [];
        let statement = '';

        if (filledFilters.length > 0) {
            if (filters.category) {
                statement += ' product.category === filters.category &&'
            }
            if (filters.gender) {
                statement += ' product.gender === filters.gender &&'
            }
            if (filters.size) {
                statement += ' product.size === filters.size &&'
            }
            if (filters.brand) {
                statement += ' product.brand === filters.brand &&'
            }
            statement = statement.slice(0, -3);
            categorisedProducts = productsData.filter(product =>
                // eslint-disable-next-line
                eval(statement)
            )
            dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
        } else {
            dispatch({ type: 'SET_PRODUCTS', payload: productsData })
        }
    }, [category, size, gender, brand, filters, dispatch, productsData]);

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
    } else {
        return (
            <div className='full-page'>
                <div className='fixed-page-header'>
                    <section className='flex-between'>
                        <SearchInput productsData={productsData} />
                        <div className='flex-center all-products-btns'>
                            <SelectCategory
                                productsData={productsData}
                                category={category}
                                setCategory={setCategory}
                                filters={filters}
                                setFilters={setFilters} />
                            <SelectGender
                                productsData={productsData}
                                gender={gender}
                                setGender={setGender}
                                filters={filters}
                                setFilters={setFilters} />
                            <SelectSize
                                productsData={productsData}
                                size={size}
                                setSize={setSize}
                                filters={filters}
                                setFilters={setFilters} />
                            <SelectBrand
                                productsData={productsData}
                                brand={brand}
                                setBrand={setBrand}
                                filters={filters}
                                setFilters={setFilters} />
                            <NavLink to='/add-product' className='primary-btn'>Add product</NavLink>
                        </div>
                    </section>
                    <h3 className='products-length'>{products ? products.length : ''} REGISTERED PRODUCTS</h3>
                    {/* <h3>Cost of all products: {allProductsCost.toFixed(2)} --- Price of all products: {allProductsPrice.toFixed(2)} --- Profit: {(allProductsPrice - allProductsCost).toFixed(2)}</h3> */}
                </div>

                <table className='all-products-table'>
                    <Thead />
                    {products && currentProducts &&
                        <tbody>
                            {currentProducts.map(product => (
                                <SingleProductInTable key={product.id} product={product} />
                            ))}
                        </tbody>
                    }
                </table>

                {products &&
                    products.length === 0 &&
                    <ErrorMessage classes='no-items-message'>Result not found.</ErrorMessage>
                }

                <ReactPaginate
                    previousLabel={<i className="fa-solid fa-arrow-left"></i>}
                    nextLabel={<i className="fa-solid fa-arrow-right"></i>}
                    pageCount={pageNumbers}
                    onPageChange={changePage}
                    containerClassName='pagination-container flex-center'
                    previousLinkClassName='previous-btn'
                    nextLinkClassName='next-btn'
                    disabledClassName='disabled-pagination-btn'
                    activeClassName='active-pagination-btn'
                />
            </div>
        )
    }
}

export default Products;
