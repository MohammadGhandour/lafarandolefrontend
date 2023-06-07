import { Field } from 'formik';
import styles from "../../styles";

function LargeInput({ label, name, type, emptyFields }) {
    return (
        <div className='w-full flex flex-col'>
            <label>{label}</label>
            <Field
                name={name}
                type={type}
                className={`${styles.smallerInput} ${emptyFields && emptyFields.includes(name) ? 'error-input' : ''}`} />
        </div>
    )
}

export default LargeInput;
