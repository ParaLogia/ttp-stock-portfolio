import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../styles/navbar.css'

const NavBar = ({ loggedIn, logout }) => {
  const links = loggedIn ? (
    <>
      <div className="nav-link-container">
        <NavLink to={'/portfolio'}>Portfolio</NavLink>
        <div className="vert-sep"></div>
        <NavLink to={'/transactions'}>Transactions</NavLink>
        <div className="vert-sep"></div>
        <button className="logout-button" onClick={logout}>
          Logout
      </button>
      </div>
    </>
  ) : (
    <div className="nav-link-container">
      <NavLink to={'/signup'}>Register</NavLink>
      <div className="vert-sep"></div>
      <NavLink to={'/login'}>Sign In</NavLink>
    </div>
  )

  return (
    <nav className="navbar">
      {links}
    </nav>
  );
  
}

export default NavBar;