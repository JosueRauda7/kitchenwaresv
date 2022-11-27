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
    rolUsuario,
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
        const rolUser = res.data.body.usuario.usuario.rol;
        const imgUser = res.data.body.usuario.usuario.img;
        setImgUsuario(imgUser);
        setRolUsuario(rolUser);
      };
      if (TOKEN && USERNAME && ID_USER) {
        setIsLogged(true);
        setUsuario(USERNAME);
        getUsuarioInfo(ID_USER);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='Menu' onClick={props.onClickedToHide}>
      <img
        className='Logo'
        src={Logo}
        alt='logo de Kitchenware'
        onClick={props.onClickedToHide}
      />
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
          <>
            {rolUsuario === "ADMIN_ROL" && (
              <Link to='/administrar' className='aLink'>
                <li className='Link'>Administrar</li>
              </Link>
            )}
            <li className='Link aLink' onClick={props.onClickedToShow}>
              <UserIcon img={imgUsuario} size='small' shadow />
            </li>
          </>
        )}
      </ul>
      {props.isClicked && (
        <ul className='SubMenu'>
          <div className='SubMenuContainer' onClick={props.onClickedToShow}>
            <Link className='aLink' to={`profile`}>
              <li className='Link UserOption'>
                <UserIcon img={imgUsuario} size='small' />
                {usuario}
              </li>
            </Link>
            <Link className='aLink' to={`/profile/edit`}>
              <li className='Link'>Editar Usuario</li>
            </Link>
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
