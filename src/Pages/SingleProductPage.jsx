import React, { useEffect, useState } from "react";
import UIForm from "../Components/FormComponents/UIForm";
import * as Yup from "yup";
import axios from "axios";
import { api } from "../Config/Config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import ErrorMessage from "../Components/ErrorMessage";
import { headers } from "../Config/Headers";
import { useLayoutEffect } from "react";
import { useAdminContext } from "../Hooks/useAdminContext";

export function calculateFinalPrice(initialPrice, discountPercentage) {
    initialPrice = Number(initialPrice);
    discountPercentage = Number(discountPercentage);
    if (discountPercentage < 0 || discountPercentage > 100) {
        return initialPrice;
    }
    const discountAmount = (initialPrice * discountPercentage) / 100;
    const finalPrice = initialPrice - discountAmount;
    return Number(finalPrice.toFixed(2));
}

function SingleProductPage() {

    const [product, setProduct] = useState({});
    const [price, setPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const { admin } = useAdminContext();

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [imageSrcToUpload, setImageSrcToUpload] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [barcode, setBarcode] = useState(0);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const productId = params.productId;

    useLayoutEffect(() => {
        axios.get(`${api}/products/byId/${productId}`, { headers: headers })
            .then(res => {
                const productVar = res.data;
                const price = productVar.price;
                const discountVar = productVar.discount || 0;
                const finalPriceVar = calculateFinalPrice(price, discountVar);
                setProduct(productVar);
                setBarcode(productVar.barcode);
                setPrice(Number(productVar.price));
                setDiscount(discountVar);
                setFinalPrice(finalPriceVar);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data.error)
                } else if (err.message === "Network Error") {
                    setError("An error occured while communicating with the server.");
                }
                setLoading(false);
            })
    }, [productId]);

    useLayoutEffect(() => {
        setImageSrcToUpload(product.photo);
    }, [product.photo]);

    const initialValues = {
        image: "",
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
        const productForm = document.getElementById("editProductForm")
        const data = new FormData(productForm);
        data.append("image", file);
        data.append("photo", fileName);
        try {
            axios.put(`${api}/products/${productId}`, data, { headers: headers });
            navigate(admin ? "/all-products" : "/");
            setFile(null);
            setFileName(null);
        } catch (error) {
            console.log(error);
            setEmptyFields(error.response.data.emptyFields);
            setError(error.response.data.error);
        } finally {
            setSubmitting(false);
        }
    };

    function deleteProduct() {
        if (admin) {
            if (window.confirm("Are you sure you want to delete this product ? ")) {
                try {
                    axios.delete(`${api}/products/${productId}`, { headers: headers });
                    navigate("/all-products");
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("You're not authorized to make this action, please contact the CTO !");
        }
    };

    function duplicateProduct() {
        localStorage.setItem("productToDuplicate", JSON.stringify(product));
        localStorage.setItem("productToDuplicateDate", new Date());
        navigate("/add-product");
    };

    useEffect(() => {
        setFinalPrice(calculateFinalPrice(price || 0, discount));
    }, [discount, price]);

    if (loading) {
        return <div className="full-page"><Loader /></div>
    } else if (error) {
        return <div className="full-page form-page"><ErrorMessage classes="general-error">{error}</ErrorMessage></div>
    } else {
        return (
            <div className="full-page form-page">
                {error && <ErrorMessage classes="product-error">{error}</ErrorMessage>}
                <h3># {product.id}</h3>
                <UIForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={updateProduct}
                    deleteProduct={deleteProduct}
                    id="editProductForm"

                    imageSrcToUpload={imageSrcToUpload}
                    setImageSrcToUpload={setImageSrcToUpload}
                    file={file}
                    setFile={setFile}
                    fileName={fileName}
                    setFileName={setFileName}

                    buttonText="Save"

                    barcode={barcode}
                    setBarcode={setBarcode}

                    price={price}
                    setPrice={setPrice}
                    finalPrice={finalPrice}
                    discount={discount}
                    setDiscount={setDiscount}

                    emptyFields={emptyFields}
                    duplicateProduct={duplicateProduct}
                    submitting={submitting}
                    admin={admin}
                />
            </div>
        )
    }
}

export default SingleProductPage;
