import { Field } from "formik";
import { productCategories } from '../../Arrays/productsCategories'

function SelectCategory({ emptyFields }) {
    return (
        <Field as='select'
            className={emptyFields && emptyFields.includes('category') ?
                'select-category-single-product error-input'
                :
                'select-category-single-product'}
            name='category'
        >
            <option value=''>Category</option>
            {productCategories.sort((a, b) => a.localeCompare(b)).map(label => (
                <option value={label} key={label}>{label}</option>
            ))}
        </Field>
    )
}

export default SelectCategory;
