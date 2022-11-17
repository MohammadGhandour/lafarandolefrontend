import { babySizes } from "../Arrays/Sizes/babySizes";
import { generalSizes } from "../Arrays/Sizes/generalSizes";
import { kidsSizes } from "../Arrays/Sizes/kidsSizes";
import { numberSizes } from "../Arrays/Sizes/numberSizes";
import { preMature } from "../Arrays/Sizes/preMature";
import './SelectCategory.css';

function SelectSize({ size, setSize, filters, setFilters }) {

    function handleChange(e) {
        setSize(e.target.value);
        filters.size = e.target.value;
        setFilters(filters);
    }

    return (
        <select
            onChange={handleChange}
            value={size}
            className='select-category'
        >
            <option value=''>Size</option>
            <optgroup label="premature">
                {preMature.map(label => (
                    <option value={label} key={label}>{label}</option>
                ))}
            </optgroup>
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
