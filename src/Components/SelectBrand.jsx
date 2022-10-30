import { brands } from "../Arrays/Products/productsBrands";
import './SelectCategory.css';

function SelectBrand({ brand, setBrand, filters, setFilters }) {

    function handleChange(e) {
        setBrand(e.target.value);
        filters.brand = e.target.value;
        setFilters(filters);
    }

    return (
        <select
            onChange={handleChange}
            value={brand}
            className='select-category'
        >
            <option value=''>Brand</option>
            {brands.map((brand, i) => (
                <option value={brand} key={i}>{brand}</option>
            ))}
        </select>
    )
}

export default SelectBrand;
