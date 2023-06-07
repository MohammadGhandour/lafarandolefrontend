import { Field } from 'formik';

function BarcodeInput({ name, type, emptyFields, barcode, setBarcode }) {
    return (
        <div className='barcode-input-wrapper flex-column-start'>
            <Field
                name={name}
                type={type}
                autoFocus
                placeholder='Barcode'
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onChange={(e) => setBarcode(e.target.value)}
                value={barcode}
                className={`${emptyFields && emptyFields.includes(name) ? 'barcode-input barcode-error-input' : 'barcode-input'}`} />
        </div>
    )
}

export default BarcodeInput;
