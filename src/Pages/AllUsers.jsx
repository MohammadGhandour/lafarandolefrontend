import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Register from '../Components/AllSales/Register';
import Loader from '../Components/Loader';
import ErrorMessage from "../Components/ErrorMessage";
import { api } from '../Config/Config'
import { headers } from '../Config/Headers';
import { Link } from "react-router-dom";
import styles from "../styles";

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
                        className={`${styles.blackButton}`}
                        onClick={() => setModalOpen(true)}>
                        Add user
                    </button>
                </div>
                <div className="w-full flex flex-col gap-2">
                    {users.map(user => (
                        <Link to={`/user/${user.id}`} className="flex items-center justify-between" key={user.id}>
                            {/* eslint-disable-next-line */}
                            <h2 className={`${user.admin != 0 && "text-custom-green"} w-full bg-custom-gray rounded-md py-2 px-4`}>{user.username}</h2>
                        </Link>
                    ))}
                </div>
                <Register modalOpen={modalOpen} setModalOpen={setModalOpen} users={users} />
            </div>
        )
    }
}

export default AllUsers;
