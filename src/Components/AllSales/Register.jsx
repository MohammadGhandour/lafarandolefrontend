import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../Config/Config';
import './Register.css';

function Register({ modalOpen, setModalOpen, users }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const backdropRef = useRef();

    useEffect(() => {
        if (modalOpen) {
            const error = document.querySelector('.credentials-error-message');
            error.classList.add("bounce");
            setTimeout(function () {
                error.classList.remove("bounce");
            }, 500);
        }
    }, [errorMessage])

    function register(e) {
        e.preventDefault();
        if (username === '' || password === '') {
            setErrorMessage('Please fill all the fields.');
        } else {
            const user = { username, password };
            axios.post(`${api}/users/register`, user)
                .then(res => {
                    let user = res.data;
                    setErrorMessage('');
                    setModalOpen(false);
                    users.push({ id: user.userId, username: user.username, admin: 0 });
                })
                .catch(err => {
                    console.log(err);
                    setErrorMessage(err.response.data.error);
                })
        }
    }

    function closeModal(e) {
        if (backdropRef.current === e.target) {
            setModalOpen(false);
        }
    }

    return (
        <div>
            {modalOpen &&
                <div className='add-user-backdrop' ref={backdropRef} onClick={closeModal}>
                    <form className='add-user-form flex-column-center' onSubmit={register}>
                        <div className='credentials-error-message'>{errorMessage}</div>
                        <input type='text' placeholder='Username' autoComplete='off'
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type='password' placeholder='Password' autoComplete='off'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='credential-button' type='submit'>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Register;
