import React from 'react';
import { useNavigate } from 'react-router-dom';

function Page404() {

    const navigate = useNavigate();

    return (
        <div className='full-page flex-center gap-m'>
            <h2>This page doesn't exist</h2>
            <button className='primary-btn' onClick={() => navigate(-1)}>GO BACK</button>
        </div>
    )
}

export default Page404;
