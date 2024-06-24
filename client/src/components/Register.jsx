import axios from 'axios'
import { React } from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'


export const Register = () => {
    const { user, setUser } = useContext(userContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8099/api/register', { username, email, password, confirmPassword })
            .then((res) => {
                setUser(res.data)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <form onSubmit={submitHandler}>
            <h2>Register</h2>
            <div>
                <label> Username:
                    <input type="text" name='username' onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label> Email:
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label> Password:
                    <input type="password" name='password' onChange={(e) => setpassword(e.target.value)} />
                </label>
                <label> Confirm Password:
                    <input type="password" name='confirmPassword' onChange={(e) => setconfirmPassword(e.target.value)} />
                </label>
            </div>
            <button>Register</button>
        </form>
    )
}
