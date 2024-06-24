import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userContext } from '../context/userContext'

export const Login = (props) => {
    const { user, setUser, storeIdinLocalStorage } = useContext(userContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8099/api/login', { email, password }, { withCredentials: true })
            .then((res) => {
                console.log(res)
                storeIdinLocalStorage(res.data._id)
                setUser(res.data)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <form onSubmit={submitHandler}>
            <h2>Login</h2>
            <div>
                <label>Email:
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Password:
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button>Login</button>
            <p>Don't have an account? <Link to='/register'>Sign up here</Link></p>
        </form>
    )
}
