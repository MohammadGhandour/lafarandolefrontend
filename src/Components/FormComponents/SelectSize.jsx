import { Field } from "formik";
import { babySizes } from "../../Arrays/babySizes";
import { generalSizes } from "../../Arrays/generalSizes";
import { kidsSizes } from "../../Arrays/kidsSizes";
import { numberSizes } from "../../Arrays/numberSizes";

function SelectSize({ emptyFields }) {
    return (
        <Field as='select'
            className={emptyFields && emptyFields.includes('size') ?
                'select-category-single-product error-input'
                :
                'select-category-single-product'}
            name='size'
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
        </Field>
    )
}

export default SelectSize;
