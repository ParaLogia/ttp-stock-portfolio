import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = ({ loggedIn, logout }) => {
  const links = loggedIn ? (
    <div>
      <NavLink to={'/portfolio'}>Portfolio</NavLink>
      <NavLink to={'/transactions'}>Transactions</NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <NavLink to={'/signup'}>Signup</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
    </div>
  )

  return (
    <div>
      <h1>TTP Stocks</h1>
      {links}
    </div>
  );
  
}

export default NavBar;