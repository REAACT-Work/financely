import React from 'react'
import "./style.css"

function Header () {
  function logoutFnc() { 
    alert("logout");
  }
  return (
    <div className='navbar'>
      <p className='logo'>Financely.</p>
      <p onClick={logoutFnc} className='logo link'>Logout</p>
    </div>
  );
}

export default Header
