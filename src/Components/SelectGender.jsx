import './SelectCategory.css';

function SelectGender({ gender, setGender, filters, setFilters }) {


    function handleChange(e) {
        setGender(e.target.value);
        filters.gender = e.target.value;
        setFilters(filters);
        localStorage.setItem("gender", filters.gender);
    }

    return (
        <select
            onChange={handleChange}
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
