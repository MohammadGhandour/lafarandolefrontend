import { Field } from "formik";
import styles from "../../styles";

function SelectGender({ emptyFields }) {
    return (
        <Field as='select'
            className={`${styles.smallerInput} ${emptyFields && emptyFields.includes('gender') ? 'error-input' : ''}`} name='gender'>
            <option value=''>Gender</option>
            <option value='Boy'>Boy</option>
            <option value='Girl'>Girl</option>
            <option value='Unisex'>Unisex</option>
            <option value='Women'>Women</option>
        </Field>
    )
}

export default SelectGender;
