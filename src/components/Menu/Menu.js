import React from "react";
import Logo from "../../assets/logo.svg";
import "./Menu.css";

const Menu = (props) => {
  return (
    <div className='Menu'>
      <img className='Logo' src={Logo} alt='logo de Kitchenware' />
      <ul>
        <li className='Link'>Inicio</li>
        <li className='Link'>Tienda</li>
        <li className='Link'>Contáctanos</li>
        <li className='Link'>Login</li>
        <li className='Link'>Regístrate</li>
      </ul>
    </div>
  );
};

export default Menu;
