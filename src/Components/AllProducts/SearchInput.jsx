import { useEffect, useState } from "react";
import { useProductsContext } from "../../Hooks/useProductsContext";

function SearchInput({ productsData }) {

    const { dispatch } = useProductsContext();
    const [productName, setProductName] = useState('');

    useEffect(() => {
        dispatch({
            type: "SET_PRODUCTS", payload: productsData.filter(
                product => productName.toLowerCase().split(' ').every(word => product.name.toLowerCase().includes(word)) || productName.split(' ').every(word => product.barcode.toLowerCase().includes(word)))
        })
    }, [productName, productsData, dispatch]);

    return (
        <div className='flex search-input-wrapper'>
            <label htmlFor='searchInput'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input
                type='text'
                className='search-input'
                id='searchInput'
                autoComplete="off"
                placeholder="Search by name or barcode"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
        </div>
    )
}

export default SearchInput;
