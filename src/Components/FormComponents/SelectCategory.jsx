import { Field } from "formik";
import { productCategories } from '../../Arrays/Products/productsCategories'
import styles from "../../styles";

function SelectCategory({ emptyFields }) {
    return (
        <Field as='select'
            className={`${styles.smallerInput} ${emptyFields && emptyFields.includes('category') ? 'error-input' : ''}`}
            name='category'>
            <option value=''>Category</option>
            {productCategories.sort((a, b) => a.localeCompare(b)).map(label => (
                <option value={label} key={label}>{label}</option>
            ))}
        </Field>
    )
}

export default SelectCategory;
