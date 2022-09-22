import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader';
import { api } from '../Config/Config'
import { headers } from '../Config/Headers';

function AllUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${api}/users`, { headers: headers })
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <h3 style={{ marginBottom: 20 }}>{users.length} REGISTERED USER{users.length > 1 ? 'S' : ''}</h3>
                {users.map(user => (
                    <div className='single-customer-wrapper flex-between' key={user.id}>
                        <h2>{user.username}</h2>
                        {/* eslint-disable-next-line */}
                        <h2>{user.admin == 0 ? 'Not admin' : 'Admin'}</h2>
                    </div>
                ))}
            </div>
        )
    }
}

export default AllUsers;
