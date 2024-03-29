import { useEffect, useState } from 'react';
import './PagesStyles/Credentials.css';
import image from '../assets/bw-clothes.webp';
// import LoginRegisterLinks from '../Components/Credentials/LoginRegisterLinks';
import axios from 'axios';
import { api } from '../Config/Config';
import styles from "../styles";

function Login() {

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

    function login(e) {
        e.preventDefault();
        setErrorMessage('');
        if (username === '' || password === '') {
            setErrorMessage('Please fill all the fields.');
        } else {
            const user = { username, password };
            axios.post(`${api}/users/login`, user)
                .then(res => {
                    setErrorMessage('');
                    localStorage.setItem('userId', JSON.stringify(res.data.userId));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('admin', JSON.stringify(res.data.admin));
                    localStorage.setItem('username', JSON.stringify(res.data.username));
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
                <h2 className='login-logo text-center'>LAFARANDOLE</h2>
                <img src={image} alt='clothes' />
                <form className='credentials-form flex-column-center' onSubmit={login}>
                    <div className='credentials-error-message'>{errorMessage}</div>
                    <input type='text' placeholder='Username' autoComplete='off'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='Password' autoComplete='off'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className={`${styles.blackButton} w-full`} type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
