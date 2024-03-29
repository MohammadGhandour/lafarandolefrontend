import { Field } from "formik";
import { babySizes } from "../../Arrays/Sizes/babySizes";
import { generalSizes } from "../../Arrays/Sizes/generalSizes";
import { kidsSizes } from "../../Arrays/Sizes/kidsSizes";
import { numberSizes } from "../../Arrays/Sizes/numberSizes";
import { preMature } from "../../Arrays/Sizes/preMature";
import styles from "../../styles";

function SelectSize({ emptyFields }) {
    return (
        <Field as='select'
            className={`${styles.smallerInput} ${emptyFields && emptyFields.includes('size') ? 'error-input' : ''}`} name='size'>
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
        </Field>
    )
}

export default SelectSize;
