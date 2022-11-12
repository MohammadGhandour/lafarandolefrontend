import { useEffect, useState } from "react";
import { useProductsContext } from "../../Hooks/useProductsContext";

function SearchInput({ productsData, productsToRender, setProductsToRender }) {

    const { products } = useProductsContext();
    const [productName, setProductName] = useState('');

    useEffect(() => {
        setProductsToRender(products.filter(
            product => productName.toLowerCase().split(' ').every(word => (product.name.concat(' ', product.description).toLowerCase()).concat(' ', product.brand.toLowerCase()).toLowerCase().includes(word)) || productName.split(' ').every(word => product.barcode.toLowerCase().includes(word)))
        );
    }, [productName, products, setProductsToRender]);

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
            <i className="flex-center fa-solid fa-magnifying-glass fa-times" onClick={() => setProductName('')}></i>
        </div>
    )
}

export default SearchInput;
