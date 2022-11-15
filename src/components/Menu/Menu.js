import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import "./Menu.css";

const Menu = (props) => {
  const { usuario, isLogged, setIsLogged, setUsuario } =
    useContext(UsuarioContext);

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    const USERNAME = localStorage.getItem("username");
    if (TOKEN && USERNAME) {
      setIsLogged(true);
      setUsuario(USERNAME);
    }
  }, []);

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
        {!isLogged ? (
          <>
            <Link to='/login' className='aLink'>
              <li className='Link'>Login</li>
            </Link>
            <Link to='/login' className='aLink'>
              <li className='Link'>Regístrate</li>
            </Link>
          </>
        ) : (
          <Link to='/logout' className='aLink'>
            <li className='Link'>{usuario}</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;
