import UIForm from "../Components/FormComponents/UIForm";
import * as Yup from 'yup';
import { api } from "../Config/Config";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage";
import { headers } from "../Config/Headers";
import SizeForm from "../Components/AddProduct/SizeForm";
import { useAdminContext } from "../Hooks/useAdminContext";
import styles from "../styles";
import { calculateFinalPrice } from "./SingleProductPage";

function AddProduct() {

    const navigate = useNavigate();
    const [arrayOfSizes, setArrayOfSizes] = useState([]);
    const [firstMounted, setFirstMounted] = useState(true);
    const { admin } = useAdminContext();

    const [submitting, setSubmitting] = useState(false);

    const [imageSrcToUpload, setImageSrcToUpload] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [barcode, setBarcode] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState('');
    const [productAlreadyExistsId, setProductAlreadyExistsId] = useState('');
    const productToDuplicate = JSON.parse(localStorage.getItem('productToDuplicate'));
    const [price, setPrice] = useState(productToDuplicate && productToDuplicate.price ? productToDuplicate.price : 0);
    const [discount, setDiscount] = useState(productToDuplicate && productToDuplicate.discount ? productToDuplicate.discount : 0);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        setFinalPrice(calculateFinalPrice(price || 0, discount));
    }, [discount, price]);

    useEffect(() => {
        const diffTime = new Date() - new Date(localStorage.getItem("productToDuplicateDate"));
        if (diffTime / 1000 > 2 && firstMounted === true) localStorage.removeItem('productToDuplicate');
        setFirstMounted(false);
    }, [firstMounted]);

    const initialValues = {
        image: '',
        barcode: '',
        name: productToDuplicate && productToDuplicate.name ? productToDuplicate.name : '',
        description: productToDuplicate && productToDuplicate.description ? productToDuplicate.description : '',
        category: productToDuplicate && productToDuplicate.category ? productToDuplicate.category : '',
        brand: productToDuplicate && productToDuplicate.brand ? productToDuplicate.brand : '',
        size: productToDuplicate && productToDuplicate.size ? productToDuplicate.size : '',
        gender: productToDuplicate && productToDuplicate.gender ? productToDuplicate.gender : '',
        quantity: productToDuplicate && productToDuplicate.quantity ? productToDuplicate.quantity : 1,
        cost: productToDuplicate && productToDuplicate.cost ? productToDuplicate.cost : 0,
    }

    const validationSchema = Yup.object().shape({})

    function addProduct() {
        setSubmitting(true);
        const productForm = document.getElementById('addProductForm')
        const data = new FormData(productForm);
        data.append('image', file);
        data.append('photo', fileName);
        data.append('arrayOfSizes', JSON.stringify(arrayOfSizes));
        // data.append('imgSrc', imageSrcToUpload);
        axios.post(`${api}/products`, data, { headers: headers })
            .then((res) => {
                setFile(null);
                setFileName(null);
                navigate('/all-products');
                setSubmitting(false);
            })
            .catch((err) => {
                setEmptyFields(err.response.data.emptyFields);
                setError(err.response.data.error);
                setProductAlreadyExistsId(err.response.data.productId);
                setSubmitting(false);
            })
    }

    function deleteSize(barcode) {
        const arrayWithoutCurrentSize = arrayOfSizes.filter(item => item.barcode !== barcode);
        setArrayOfSizes(arrayWithoutCurrentSize);
    }

    return (
        <div className='full-page form-page'>
            {error && productAlreadyExistsId &&
                <ErrorMessage classes='product-error'>
                    {error}
                    <Link to={`/product/${productAlreadyExistsId}`} className='product-link'>
                        {productAlreadyExistsId}
                    </Link>
                </ErrorMessage>
            }
            <h3>Add Porduct</h3>
            <UIForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={addProduct}
                id="addProductForm"

                imageSrcToUpload={imageSrcToUpload}
                setImageSrcToUpload={setImageSrcToUpload}
                file={file}
                setFile={setFile}
                fileName={fileName}
                setFileName={setFileName}

                buttonText="Add product"

                barcode={barcode}
                setBarcode={setBarcode}

                price={price}
                setPrice={setPrice}
                finalPrice={finalPrice}
                discount={discount}
                setDiscount={setDiscount}

                priceAfterDiscount={Number(initialValues.price - (initialValues.price * (initialValues.discount / 100))).toFixed(2)}

                emptyFields={emptyFields}
                submitting={submitting}
                admin={admin}
            />
            <SizeForm arrayOfSizes={arrayOfSizes} setArrayOfSizes={setArrayOfSizes} originalBarcode={barcode} />
            <div className="w-full mt-8">
                <div className="w-full flex flex-col gap-4">
                    {arrayOfSizes.map((productVariant, i) => (
                        <div key={i} className="w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                            <div className="w-full flex-1 whitespace-nowrap bg-custom-gray py-2 px-4 rounded-md lg:max-w-[150px]">{productVariant.size}</div>
                            <div className="w-full flex-1 whitespace-nowrap bg-custom-gray py-2 px-4 rounded-md">{productVariant.barcode}</div>
                            <div className="w-full flex-1 whitespace-nowrap bg-custom-gray py-2 px-4 rounded-md">{productVariant.quantity}</div>
                            <button className={`whitespace-nowrap ${styles.redButton} w-full lg:w-auto`} onClick={() => deleteSize(productVariant.barcode)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default AddProduct;
