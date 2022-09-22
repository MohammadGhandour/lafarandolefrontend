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

function Products() {

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${api}/products`, { headers: headers })
            .then(response => {
                let productsData = response.data;
                setProductsData(productsData);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [loading, setLoading]);

    const { products, dispatch } = useProductsContext();
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    //eslint-disable-next-line
    const [bothSelectFieldFilled, setBothSelectFieldFilled] = useState(false);

    useEffect(() => {
        dispatch({ type: "SET_PRODUCTS", payload: productsData })
        // eslint-disable-next-line
    }, [productsData, dispatch])

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 10;

    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = products ? products.slice(indexOfLastProduct, indexOfLastProduct + productsPerPage) : null;

    const pageNumbers = products ? Math.ceil(products.length / productsPerPage) : 0;

    function changePage({ selected }) {
        setCurrentPage(selected)
    }

    useEffect(() => {
        if (category && gender) {
            setBothSelectFieldFilled(true);
            const categorisedProducts =
                productsData.filter((product) => product.gender === gender && product.category === category);
            dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
        } else {
            setBothSelectFieldFilled(false);
            if (!category && gender) {
                const categorisedProducts = productsData.filter((product) => product.gender === gender);
                dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
            } else if (category && !gender) {
                const categorisedProducts = productsData.filter((product) => product.category === category);
                dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
            }
        }
    }, [category, gender, bothSelectFieldFilled, dispatch, productsData])

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                Hello worldddddd
                {/* <div className='fixed-page-header'>
                    <section className='flex-between'>
                        <SearchInput productsData={productsData} />
                        <div className='flex-center all-products-btns'>
                            <SelectCategory
                                productsData={productsData}
                                category={category}
                                setCategory={setCategory}
                                bothSelectFieldFilled={bothSelectFieldFilled} />
                            <SelectGender
                                productsData={productsData}
                                gender={gender}
                                setGender={setGender}
                                bothSelectFieldFilled={bothSelectFieldFilled} />
                            <NavLink to='/add-product' className='primary-btn'>Add product</NavLink>
                        </div>
                    </section>
                    <h3 className='products-length'>{products ? products.length : ''} REGISTERED PRODUCTS</h3>
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
                /> */}
            </div>
        )
    }
}

export default Products;
