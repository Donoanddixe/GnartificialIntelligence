import { React, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Home = (props) => {
    const id = window.localStorage.getItem('Logged in user id')
    const { user, setUser } = useContext(userContext)

    const navigate = useNavigate()
    const logout = () => {
        axios.post('http://localhost:8099/api/logout', {}, { withCredentials: true })
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8099/api/get_logged_in_user/${id}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <p>Don't have an account? <Link to='/register'>Sign up here</Link></p>
            <button onClick={logout}>logout</button>
        </div>
    )
}
