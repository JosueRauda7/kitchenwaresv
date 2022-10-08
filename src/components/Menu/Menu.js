import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "./Menu.css";

const Menu = (props) => {
  return (
    <div className='Menu'>
      <img className='Logo' src={Logo} alt='logo de Kitchenware' />
      <ul>
        <Link to='/' className='aLink'>
          <li className='Link'>Inicio</li>
        </Link>
        <Link to='/tienda' className='aLink'>
          <li className='Link'>Tienda</li>
        </Link>
        <Link to='/contactanos' className='aLink'>
          <li className='Link'>Contáctanos</li>
        </Link>
        <Link to='/login' className='aLink'>
          <li className='Link'>Login</li>
        </Link>
        <Link to='/login' className='aLink'>
          <li className='Link'>Regístrate</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
