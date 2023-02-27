import { productCategories } from "../Arrays/Products/productsCategories";
import './SelectCategory.css';

function SelectCategory({ category, setCategory, filters, setFilters }) {

    function handleChange(e) {
        setCategory(e.target.value);
        filters.category = e.target.value;
        setFilters(filters);
        localStorage.setItem("category", filters.category);
    }

    return (
        <select
            onChange={handleChange}
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
