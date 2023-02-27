import { brands } from "../Arrays/Products/productsBrands";
import './SelectCategory.css';

function SelectBrand({ brand, setBrand, filters, setFilters }) {

    function handleChange(e) {
        setBrand(e.target.value);
        filters.brand = e.target.value;
        setFilters(filters);
        localStorage.setItem("brand", filters.brand);
    }

    return (
        <select
            onChange={handleChange}
            value={brand}
            className='select-category'
        >
            <option value=''>Brand</option>
            {brands.sort((a, b) => a.localeCompare(b)).map((brand, i) => (
                <option value={brand} key={i}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            ))}
            <option value='others'>Others</option>
        </select>
    )
}

export default SelectBrand;
