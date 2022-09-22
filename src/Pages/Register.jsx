import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/bw-clothes.webp';
import LoginRegisterLinks from '../Components/Credentials/LoginRegisterLinks';
import { api } from '../Config/Config';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const error = document.querySelector('.credentials-error-message');
        error.classList.add("bounce");
        setTimeout(function () {
            error.classList.remove("bounce");
        }, 500);
    }, [errorMessage])

    function register(e) {
        e.preventDefault();
        if (username === '' || password === '') {
            setErrorMessage('Please fill all the fields.');
        } else {
            const user = { username, password };
            axios.post(`${api}/users/register`, user)
                .then(res => {
                    setErrorMessage('');
                    localStorage.setItem('userId', JSON.stringify(res.data.id));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('admin', JSON.stringify(res.data.admin));
                    localStorage.setItem('username', JSON.stringify(res.data.username));
                    navigate('/');
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    setErrorMessage(err.response.data.error);
                })
        }
    }

    return (
        <div className='container-wrapper'>
            <div className='credentials-container'>
                <LoginRegisterLinks active='register' />
                {/* <section className='left-section'>
                    <h1>Hello world and welcome to my website</h1>
                    <p>This website is a system mainly dedicated to clothes sellings. We'll manage your inventory, handle the statistics and the hard work for you, providing you a smooth and a simple way to store and sell your products. <br />
                        Since you landed on this website, you're probably looking for a way to save your time... So I guess you'll get what you came for.
                    </p>
                </section> */}
                <img src={image} alt='clothes' />
                <form className='credentials-form flex-column-center' onSubmit={register}>
                    <div className='credentials-error-message'>{errorMessage}</div>
                    <input type='text' placeholder='Username' autoComplete='off'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='Password' autoComplete='off'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* <div>Already have an account ? <Link to='/'>Login</Link></div> */}
                    <button className='credential-button' type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
