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

        <div className='w-[300px] h-[300px] rounded-md border border-black overflow-hidden'>
            <label htmlFor='image' className='w-full'>
                {
                    imageSrcToUpload ?
                        <img className='w-full h-full object-cover' src={imageSrcToUpload} alt='' />
                        :
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <i className="fa-solid fa-circle-plus text-4xl"></i>
                            Add a photo
                        </div>
                }
            </label>

            <Field
                id='image'
                type='file'
                name='image'
                className='hidden'
                onChange={(e) => showAddedImage(e)}
            />
        </div>
    )
}

export default ImageInput;
