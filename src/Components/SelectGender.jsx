import { useEffect } from "react";
import { useProductsContext } from "../Hooks/useProductsContext";
import './SelectCategory.css';

function SelectGender({ productsData, gender, setGender, bothSelectFieldFilled }) {

    const { dispatch } = useProductsContext();

    useEffect(() => {
        if (!bothSelectFieldFilled) {
            if (gender) {
                const categorisedProducts = productsData.filter((product) => product.gender === gender);
                dispatch({ type: 'SET_PRODUCTS', payload: categorisedProducts })
            } else {
                dispatch({ type: 'SET_PRODUCTS', payload: productsData })
            }
        }
    }, [gender, dispatch, bothSelectFieldFilled, productsData]);

    return (
        <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className='select-category'
        >
            <option value=''>Gender</option>
            <option value='Boy'>Boy</option>
            <option value='Girl'>Girl</option>
            <option value='Women'>Women</option>
            <option value='Unisex'>Unisex</option>
        </select>
    )
}

export default SelectGender;
