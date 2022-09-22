import { Field } from 'formik';

function ImageInput({
    imageSrcToUpload,
    setImageSrcToUpload,
    setFile,
    setFileName
}) {
    function showAddedImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrcToUpload(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    return (

        <div className='product-image-wrapper'>
            <label htmlFor='image' className='image-label'>
                {imageSrcToUpload ?
                    <div className='actual-image-wrapper'>
                        <img className='bla' src={imageSrcToUpload} alt='bla' />
                    </div>
                    :
                    <div className='empty-image-to-upload flex-column-center'>
                        <i className="fa-solid fa-circle-plus"></i>
                        Add a photo
                    </div>
                }
            </label>

            <Field
                id='image'
                type='file'
                name='image'
                className='image-to-upload-input'
                onChange={(e) => showAddedImage(e)}
            />
        </div>
    )
}

export default ImageInput;
