import { useContext, useEffect, useState } from "react";

import "./Usuario.css";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import UserIcon from "../../components/UserIcon/UserIcon";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import axios from "axios";
import { baseUrl } from "../../apiConfig";
import { Link } from "react-router-dom";

const Usuario = (props) => {
  const [usuarioInfo, setUsuarioInfo] = useState({});

  const { imgUsuario, usuario } = useContext(UsuarioContext);
  useEffect(() => {
    const ID_USER = localStorage.getItem("idUsuario");
    const getUsuarioInfo = async (id) => {
      const res = await axios.get(`${baseUrl}/usuarios/${id}`);
      const user = res.data.body.usuario.usuario;
      setUsuarioInfo(user);
    };
    getUsuarioInfo(ID_USER);
  }, []);

  return (
    <>
      <div className='Container'>
        <div className='UsuarioContainer'>
          <div className='InformacionUsuario'>
            <div className='ImgUsuarioContainer'>
              <UserIcon img={imgUsuario} size='large' />
            </div>
            <h2 className='UsernameUsuario'>{usuario}</h2>
            <p className='CorreoUsuario'>{usuarioInfo.correo}</p>
            <Link
              to={`/${usuario}/edit`}
              className='Button primary LinkCard LinkButton EditProfileButton'>
              Editar Perfil
            </Link>
          </div>
          <div className='DatosUsuario'>
            <PageTitle>Hola, {usuario}</PageTitle>
            <div className='DatosUsuarioBody'>
              <h1 className='h1DatosUsuario'>Pagos</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Usuario;
