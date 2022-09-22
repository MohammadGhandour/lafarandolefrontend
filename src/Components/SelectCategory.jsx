import { useEffect } from "react";
import { productCategories } from "../Arrays/productsCategories";
import { useProductsContext } from "../Hooks/useProductsContext";
import './SelectCategory.css';

function SelectCategory({ productsData, category, setCategory, bothSelectFieldFilled }) {

    const { dispatch } = useProductsContext();

    useEffect(() => {
        if (!bothSelectFieldFilled) {
            if (category) {
                const categorisedProducts = productsData.filter((product) => product.category === category);
                dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
            } else {
                dispatch({ type: 'SET_PRODUCTS', payload: productsData })
            }
        }
    }, [category, dispatch, bothSelectFieldFilled, productsData]);

    return (
        <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='select-category'
        >
            <option value=''>Category</option>
            {productCategories.sort((a, b) => a.localeCompare(b)).map(label => (
                <option value={label} key={label}>{label}</option>
            ))}
        </select>
    )
}

export default SelectCategory;
