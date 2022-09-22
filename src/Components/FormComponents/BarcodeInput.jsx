import { Field } from 'formik';

function BarcodeInput({ name, type, emptyFields }) {
    return (
        <div className='barcode-input-wrapper flex-column-start'>
            <Field
                name={name}
                type={type}
                autoFocus
                placeholder='Barcode'
                className={emptyFields && emptyFields.includes(name) ? 'barcode-input barcode-error-input' : 'barcode-input'} />
        </div>
    )
}

export default BarcodeInput;
