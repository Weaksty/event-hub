import React from 'react'
import './Header.css'
import logo from '../../assets/logo.png'

function Header() {
    return (
        <header className='header' >
            
            <div className="container">
                <a href="#" className="logo-link"><img src={logo} alt="Event Hub" className="logo" />Event Hub</a>
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Pages</a>
                    <a href="#">Events</a>
                    <a href="#">Speakers</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact Us</a>
                </nav>
                <input type="search" className='search' placeholder='Search...' />
        <div className='bth'>
        <button className='bthLog'>Login</button>
            <button className='bthReg'>Register</button>
        </div>
            </div>
        </header>
        
    )
}

export default Header
