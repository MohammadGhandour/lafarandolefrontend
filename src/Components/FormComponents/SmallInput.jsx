import { Field } from 'formik';
import styles from "../../styles";

function SmallInput({ label, name, type, emptyFields, disabled }) {
    return (
        <div className='flex flex-col w-full'>
            <label>{label}</label>
            <Field
                name={name}
                type={type}
                disabled={disabled ? disabled : false}
                autoComplete='off'
                min='0'
                step='any'
                className={`${styles.smallerInput} ${emptyFields && emptyFields.includes(name) ? 'error-input' : ''} min-w-[4rem]`} />
        </div>
    )
}

export default SmallInput;
