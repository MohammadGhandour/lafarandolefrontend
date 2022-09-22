import { Field } from "formik";

function SelectGender({ emptyFields }) {
    return (
        <div className='input-wrapper flex-column-start small-input'>
            <Field as='select'
                className={emptyFields && emptyFields.includes('gender') ?
                    'select-gender-single-product error-input'
                    :
                    'select-gender-single-product'}
                name='gender'
            >
                <option value=''>Gender</option>
                <option value='Boy'>Boy</option>
                <option value='Girl'>Girl</option>
                <option value='Unisex'>Unisex</option>
                <option value='Women'>Women</option>
            </Field>
        </div>
    )
}

export default SelectGender;
