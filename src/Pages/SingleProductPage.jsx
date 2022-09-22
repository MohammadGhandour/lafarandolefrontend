import React, { useEffect, useState } from 'react'
import UIForm from '../Components/FormComponents/UIForm';
import * as Yup from 'yup';
import axios from 'axios';
import { api } from '../Config/Config';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import ErrorMessage from "../Components/ErrorMessage";
import { headers } from '../Config/Headers';

function SingleProductPage() {

    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    const [imageSrcToUpload, setImageSrcToUpload] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [barcode, setBarcode] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState('');

    const params = useParams();
    const productId = params.productId;

    useEffect(() => {
        axios.get(`${api}/products/${productId}`, { headers: headers })
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [productId])

    useEffect(() => {
        setBarcode(product.barcode);
    }, [product.barcode]);

    useEffect(() => {
        setImageSrcToUpload(product.photo);
    }, [product.photo]);

    const initialValues = {
        image: '',
        barcode: product.barcode,
        name: product.name,
        description: product.description,
        category: product.category,
        size: product.size,
        gender: product.gender,
        quantity: product.quantity,
        cost: product.cost ? product.cost : 0,
        price: product.price ? product.price : 0,
        discount: product.discount ? product.discount : 0,
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
    })

    function updateProduct() {
        const productForm = document.getElementById('editProductForm')
        const data = new FormData(productForm);
        data.append('image', file);
        data.append('photo', fileName);
        axios.put(`${api}/products/${productId}`, data, { headers: headers })
            .then((res) => {
                navigate('/');
                setFile(null);
                setFileName(null);
            })
            .catch((err) => {
                console.log(err);
                setEmptyFields(err.response.data.emptyFields);
                setError(err.response.data.error);
            })
    }

    function deleteProduct() {
        if (window.confirm('Are you sure you want to delete this product ? ')) {
            axios.delete(`${api}/products/${productId}`, { headers: headers })
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    function duplicateProduct() {
        localStorage.setItem('productToDuplicate', JSON.stringify(product));
        navigate('/add-product')
    }

    if (!product.id) {
        return (
            <div className='full-page'>
                <Loader />
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
                />
            </div>
        )
    }
}

export default SingleProductPage;
