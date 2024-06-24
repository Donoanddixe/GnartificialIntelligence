import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div>
            <button>
                <Link to={'/home'}>Home</Link>
            </button>
            <button>
                <Link to={'/request'}>Get Gnar</Link>
            </button>
            <button>
                <Link to={'/about'}>About</Link>
            </button>
            <button>
                <Link to={'/library'}>Song Library</Link>
            </button>
            <button>
                <Link to={'/login'}>Login/Logout</Link>
            </button>
        </div>
    )
}
