import '../../GeneralStyles/Form.css';
import { Formik, Form } from 'formik';
import LargeInput from './LargeInput';
import SmallInput from './SmallInput';
import SelectGender from './SelectGender';
import SelectCategory from './SelectCategory';
import ImageInput from './ImageInput';
import UIButton from './UIButton';
import SelectSize from './SelectSize';
import BarcodeInput from './BarcodeInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UIForm({
    initialValues,
    validationSchema,
    onSubmit,
    deleteProduct,
    id,
    imageSrcToUpload,
    setImageSrcToUpload,
    file,
    setFile,
    fileName,
    setFileName,
    buttonText,
    barcode,
    priceAfterDiscount,
    emptyFields,
    duplicateProduct
}) {

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation().pathname;

    const [isProductPage, setIsProductPage] = useState(null);

    useEffect(() => {
        if (params.productId) {
            setIsProductPage(true);
        } else {
            setIsProductPage(false);
        }
    }, [params.productId]);

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >
            <Form className='ui-form' encType='multipart/form-data' id={id} >
                <div className='flex-column-center barcode-image-wrapper'>
                    <ImageInput
                        imageSrcToUpload={imageSrcToUpload}
                        setImageSrcToUpload={setImageSrcToUpload}
                        file={file}
                        setFile={setFile}
                        fileName={fileName}
                        setFileName={setFileName}
                    />
                    <BarcodeInput
                        name='barcode'
                        type='number'
                        emptyFields={emptyFields} />
                </div>
                <div className='form-inputs-wrapper'>
                    <LargeInput label='Name *' name='name' type='text' emptyFields={emptyFields} />
                    <LargeInput label='Description' name='description' type='text' emptyFields={emptyFields} />
                    <SelectCategory emptyFields={emptyFields} />
                    <div className='row-inputs'>
                        <SelectSize emptyFields={emptyFields} />
                        <SelectGender emptyFields={emptyFields} />
                        <SmallInput label='Quantity *' name='quantity' type='number' emptyFields={emptyFields} />
                    </div>
                    <div className='row-inputs'>
                        <SmallInput label='Cost *' name='cost' type='number' emptyFields={emptyFields} />
                        <SmallInput label='Price *' name='price' type='number' emptyFields={emptyFields} />
                        <SmallInput label='Discount' name='discount' type='number' emptyFields={emptyFields} />
                        {location !== '/add-product' &&
                            <div className='input-wrapper flex-column-start small-input'>
                                <label>Final price</label>
                                <div className='form-input'>{priceAfterDiscount}</div>
                            </div>}
                    </div>
                    <div className='form-btns flex-start'>
                        <UIButton>{buttonText}</UIButton>
                        {isProductPage &&
                            <button type='button' className='primary-btn' onClick={duplicateProduct}>Duplicate</button>
                        }
                        {isProductPage &&
                            <button type='button' className='delete-btn' onClick={deleteProduct}>Delete</button>
                        }
                        <button type='button' className='grey-btn' onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default UIForm;
