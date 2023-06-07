import { Field } from "formik";
import { brands } from "../../Arrays/Products/productsBrands";
import styles from "../../styles";

function SelectBrand({ emptyFields }) {
    return (
        <Field as='select'
            className={`${styles.smallerInput} ${emptyFields && emptyFields.includes('brand') ? 'error-input' : ''}`} name='brand'>
            <option value=''>Brand</option>
            {brands.sort((a, b) => a.localeCompare(b)).map(brand => (
                <option value={brand} key={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            ))}
            <option value='others'>Others</option>
        </Field>
    )
}

export default SelectBrand;
