import { Field } from 'formik';

function LargeInput({ label, name, type, emptyFields }) {
    return (
        <div className='input-wrapper flex-column-start large-input'>
            <label>{label}</label>
            <Field
                name={name}
                type={type}
                className={emptyFields && emptyFields.includes(name) ? 'form-input error-input' : 'form-input'} />
        </div>
    )
}

export default LargeInput;
