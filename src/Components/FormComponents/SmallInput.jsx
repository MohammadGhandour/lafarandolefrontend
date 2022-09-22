import { Field } from 'formik';

function SmallInput({ label, name, type, emptyFields, disabled }) {
    return (
        <div className='input-wrapper flex-column-start small-input'>
            <label>{label}</label>
            <Field
                name={name}
                type={type}
                disabled={disabled ? disabled : false}
                autoComplete='off'
                min='0'
                step='any'
                className={emptyFields && emptyFields.includes(name) ? 'form-input error-input' : 'form-input'} />
        </div>
    )
}

export default SmallInput;
