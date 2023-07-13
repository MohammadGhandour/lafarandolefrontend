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
import SelectBrand from './SelectBrand';
import styles from "../../styles";

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
    setBarcode,
    priceAfterDiscount,
    emptyFields,
    duplicateProduct,
    submitting,
    admin
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
            <Form className='w-full flex flex-col lg:flex-row items-start gap-8 mt-8' encType='multipart/form-data' id={id} >
                <div className='flex flex-col items-center justify-center w-[300px] h-[300px] relative my-0 mx-auto lg:mx-0'>
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
                        emptyFields={emptyFields}
                        barcode={barcode}
                        setBarcode={setBarcode} />
                </div>
                <div className='w-full lg:w-[80%] flex flex-col gap-2'>
                    <LargeInput label='Name *' name='name' type='text' emptyFields={emptyFields} />
                    <LargeInput label='Description' name='description' type='text' emptyFields={emptyFields} />
                    <div className="w-full flex flex-col lg:flex-row items-center gap-4 mt-4">
                        <SelectCategory emptyFields={emptyFields} />
                        <SelectBrand emptyFields={emptyFields} />
                        <SelectSize emptyFields={emptyFields} />
                        <SelectGender emptyFields={emptyFields} />
                    </div>
                    <div className="w-full flex flex-col lg:flex-row items-center gap-4">
                        <SmallInput label='Quantity *' name='quantity' type='number' emptyFields={emptyFields} />
                        <SmallInput label='Cost *' name='cost' type='number' emptyFields={emptyFields} />
                        <SmallInput label='Price *' name='price' type='number' emptyFields={emptyFields} />
                        <SmallInput label='Discount' name='discount' type='number' emptyFields={emptyFields} />
                    </div>
                    {location !== '/add-product' &&
                        <div className={`flex flex-col items-start gap-2 whitespace-nowrap`}>
                            <label>Final price</label>
                            <div className={`${styles.smallerInput} max-w-[120px]`}>{priceAfterDiscount}</div>
                        </div>
                    }
                    <div className='flex items-center gap-4 mt-2'>
                        <UIButton>{submitting ? <i className="fa-solid fa-spinner"></i> : buttonText}</UIButton>
                        {isProductPage && <button type='button' className={`${styles.blackButton}`} onClick={duplicateProduct}>Duplicate</button>}
                        {isProductPage && <button type='button' className={`${styles.redButton}`} onClick={deleteProduct}>Delete</button>}
                        <button type='button' className={`${styles.grayButton}`} onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default UIForm;
