import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Register from '../Components/AllSales/Register';
import Loader from '../Components/Loader';
import ErrorMessage from "../Components/ErrorMessage";
import { api } from '../Config/Config'
import { headers } from '../Config/Headers';
import { Link } from "react-router-dom";

function AllUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${api}/users`, { headers: headers })
            .then(res => {
                setUsers(res.data);
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
    }, [])

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='general-error'>{error}</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <div className="flex-between mb-l">
                    <h3>{users.length} REGISTERED USER{users.length > 1 ? 'S' : ''}</h3>
                    <button
                        className='primary-btn'
                        onClick={() => setModalOpen(true)}>
                        Add user
                    </button>
                </div>
                {users.map(user => (
                    <Link to={`/user/${user.id}`} className='single-customer-wrapper flex-between' key={user.id}>
                        <h2>{user.username}</h2>
                        {/* eslint-disable-next-line */}
                        <h2>{user.admin == 0 ? 'Not admin' : 'Admin'}</h2>
                    </Link>
                ))}
                <Register modalOpen={modalOpen} setModalOpen={setModalOpen} users={users} />
            </div>
        )
    }
}

export default AllUsers;
