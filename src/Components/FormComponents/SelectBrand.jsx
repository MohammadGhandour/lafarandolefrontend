import { Field } from "formik";
import { brands } from "../../Arrays/Products/productsBrands";

function SelectBrand({ emptyFields }) {
    return (
        <Field as='select'
            className={emptyFields && emptyFields.includes('brand') ?
                'select-category-single-product error-input'
                :
                'select-category-single-product'}
            name='brand'
        >
            <option value=''>Brand</option>
            {brands.sort((a, b) => a.localeCompare(b)).map(label => (
                <option value={label} key={label}>{label}</option>
            ))}
        </Field>
    )
}

export default SelectBrand;
