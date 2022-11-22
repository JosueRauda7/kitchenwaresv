import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../apiConfig";
import Logo from "../../assets/logo.svg";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import UserIcon from "../UserIcon/UserIcon";
import "./Menu.css";

const Menu = (props) => {
  const {
    usuario,
    isLogged,
    setIsLogged,
    setUsuario,
    setRolUsuario,
    imgUsuario,
    setImgUsuario,
  } = useContext(UsuarioContext);

  useEffect(() => {
    try {
      const TOKEN = localStorage.getItem("token");
      const USERNAME = localStorage.getItem("username");
      const ID_USER = localStorage.getItem("idUsuario");
      const getUsuarioInfo = async (id) => {
        const res = await axios.get(`${baseUrl}/usuarios/${id}`);
        const rolUsuario = res.data.body.usuario.usuario.rol;
        const imgUser = res.data.body.usuario.usuario.img;
        setImgUsuario(imgUser);
        return rolUsuario;
      };
      if (TOKEN && USERNAME && ID_USER) {
        setIsLogged(true);
        setUsuario(USERNAME);
        setRolUsuario(getUsuarioInfo(ID_USER).rolUsuario);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='Menu' onClicked={props.onClickedToShow}>
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
              <li className='Link'>Iniciar Sesión</li>
            </Link>
            <Link to='/registrar' className='aLink'>
              <li className='Link'>Regístrarse</li>
            </Link>
          </>
        ) : (
          <li className='Link aLink' onClick={props.onClickedToShow}>
            {usuario}
          </li>
        )}
      </ul>
      {!props.isClicked && (
        <ul className='SubMenu'>
          <div className='SubMenuContainer' onClick={props.onClickedToShow}>
            <li className='Link aLink UserOption'>
              <UserIcon img={imgUsuario} />
              {usuario}
            </li>
            <li className='Link aLink'>Editar Usuario</li>
            <Link className='aLink' to='logout'>
              <li className='Link'>Cerrar Sesión</li>
            </Link>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Menu;
