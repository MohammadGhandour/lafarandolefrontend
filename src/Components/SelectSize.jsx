import { useEffect } from "react";
import { babySizes } from "../Arrays/Sizes/babySizes";
import { generalSizes } from "../Arrays/Sizes/generalSizes";
import { kidsSizes } from "../Arrays/Sizes/kidsSizes";
import { numberSizes } from "../Arrays/Sizes/numberSizes";
import { useProductsContext } from "../Hooks/useProductsContext";
import './SelectCategory.css';

function SelectSize({ productsData, size, setSize }) {

    const { dispatch } = useProductsContext();

    useEffect(() => {
        if (size) {
            const categorisedProducts = productsData.filter((product) => product.size === size);
            dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
        } else {
            dispatch({ type: 'SET_PRODUCTS', payload: productsData })
        }
    }, [size, dispatch, productsData]);

    return (
        <select
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className='select-category'
        >
            <option value=''>Size</option>
            <optgroup label='Baby'>
                {babySizes.map(label => (
                    <option value={label} key={label}>{label}</option>
                ))}
            </optgroup>
            <optgroup label='Kids'>
                {kidsSizes.map(label => (
                    <option value={label} key={label}>{label}</option>
                ))}
            </optgroup>
            <optgroup label='Generals'>
                {generalSizes.map(label => (
                    <option value={label} key={label}>{label}</option>
                ))}
            </optgroup>
            <optgroup label='Generals'>
                {numberSizes.map(label => (
                    <option value={label} key={label}>{label}</option>
                ))}
            </optgroup>
        </select>
    )
}

export default SelectSize;
