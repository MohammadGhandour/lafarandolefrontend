import React, { useState } from 'react';
import UIForm from '../Components/FormComponents/UIForm';
import * as Yup from 'yup';
import axios from 'axios';
import { api } from '../Config/Config';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import ErrorMessage from "../Components/ErrorMessage";
import { headers } from '../Config/Headers';
import { useLayoutEffect } from 'react';

function SingleProductPage() {

    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [imageSrcToUpload, setImageSrcToUpload] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [barcode, setBarcode] = useState(0);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const productId = params.productId;

    useLayoutEffect(() => {
        axios.get(`${api}/products/byId/${productId}`, { headers: headers })
            .then(res => {
                setProduct(res.data);
                setBarcode(res.data.barcode);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data.error)
                } else if (err.message === 'Network Error') {
                    setError('An error occured while communicating with the server.');
                }
                setLoading(false);
            })
    }, [productId]);

    useLayoutEffect(() => {
        setImageSrcToUpload(product.photo);
    }, [product.photo]);

    const initialValues = {
        image: '',
        barcode: product.barcode,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        size: product.size,
        gender: product.gender,
        quantity: product.quantity,
        cost: product.cost ? product.cost : 0,
        price: product.price ? product.price : 0,
        discount: product.discount ? product.discount : 0,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
    });

    function updateProduct() {
        setSubmitting(true);
        const productForm = document.getElementById('editProductForm')
        const data = new FormData(productForm);
        data.append('image', file);
        data.append('photo', fileName);
        axios.put(`${api}/products/${productId}`, data, { headers: headers })
            .then((res) => {
                navigate('/all-products');
                setFile(null);
                setFileName(null);
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err);
                setEmptyFields(err.response.data.emptyFields);
                setError(err.response.data.error);
                setSubmitting(false);
            })
    };

    function deleteProduct() {
        if (window.confirm('Are you sure you want to delete this product ? ')) {
            axios.delete(`${api}/products/${productId}`, { headers: headers })
                .then(res => {
                    navigate('/all-products');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    function duplicateProduct() {
        localStorage.setItem('productToDuplicate', JSON.stringify(product));
        localStorage.setItem('productToDuplicateDate', new Date());
        navigate('/add-product');
    };

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page form-page'>
                <ErrorMessage classes='general-error'>{error}</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className='full-page form-page'>
                {error && <ErrorMessage classes='product-error'>{error}</ErrorMessage>}
                <h3># {product.id}</h3>
                <UIForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={updateProduct}
                    deleteProduct={deleteProduct}
                    id='editProductForm'

                    imageSrcToUpload={imageSrcToUpload}
                    setImageSrcToUpload={setImageSrcToUpload}
                    file={file}
                    setFile={setFile}
                    fileName={fileName}
                    setFileName={setFileName}

                    buttonText='Save'

                    barcode={barcode}
                    setBarcode={setBarcode}

                    priceAfterDiscount={product.priceAfterDiscount}

                    emptyFields={emptyFields}
                    duplicateProduct={duplicateProduct}
                    submitting={submitting}
                />
            </div>
        )
    }
}

export default SingleProductPage;
