import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { baseUrl } from "../../../apiConfig";
import Button from "../../../components/Button/Button";
import Footer from "../../../components/Footer/Footer";
import InputText from "../../../components/InputText/InputText";
import PageTitle from "../../../components/PageTitle/PageTitle";

import "./FormularioUsuario.css";

const FormularioUsuario = (props) => {
  const [usuario, setUsuario] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [username, setUsername] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [imagenUsuario, setImagenUsuario] = useState(null);
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USER_ROL");
  const [estado, setEstado] = useState(true);
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorImgUsuario, setErrorImgUsuario] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);
  const token = localStorage.getItem("token");
  const idMyUser = localStorage.getItem("idUsuario");

  const MySwal = withReactContent(Swal);

  const { search } = useLocation();
  const usuarioIndexSearch = search.indexOf("usuario");
  const idUsuario = search.split(/\?|=|&/)[usuarioIndexSearch + 1];

  const getUsuario = async (idUse) => {
    try {
      if (idUse.length === 0) {
        return;
      }
      const url = `${baseUrl}/usuarios/${idUse}`;
      const res = await axios({
        method: "get",
        url,
        headers: {
          "x-token": token,
        },
      });
      const user = res.data.body.usuario.usuario;
      setUsuario(res.data.body.usuario.usuario);
      setUsername(user.username);
      setEmail1(user.correo);
      setEmail2(user.correo);
      setRol(user.rol);
      setEstado(user.estado);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuario(idUsuario);
  }, []);

  const resetearErrores = () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorImgUsuario("");
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      handleAgregarUsuario();
    }
  };

  const handleSetUsername = (e) => {
    setErrorUsername("");
    setUsername(e.target.value);
  };

  const handleSetEmail1 = (e) => {
    setErrorEmail("");
    setEmail1(e.target.value);
  };

  const handleSetEmail2 = (e) => {
    setErrorEmail("");
    setEmail2(e.target.value);
  };

  const handleSetImgUsuario = (e) => {
    setErrorImgUsuario("");
    setImagenUsuario(e.target.files[0]);
  };

  const handleSetPassword = (e) => {
    setErrorPassword("");
    setPassword(e.target.value);
  };

  const handleSetRol = (e) => {
    if (e.target.value === "Usuario") {
      setRol("USER_ROL");
    } else if (e.target.value === "Administrador") {
      setRol("ADMIN_ROL");
    }
  };

  const handleSetEstado = (e) => {
    if (e.target.value === "Activo") {
      setEstado(true);
    }
    if (e.target.value === "Inhabilitado") {
      setEstado(false);
    }
  };

  const handleAgregarUsuario = async () => {
    try {
      const user = {
        username,
        correo: email1,
        password,
        rol,
        estado,
      };

      const url = `${baseUrl}/usuarios`;
      const res = await axios.post(url, user, {
        headers: {
          "x-token": token,
        },
      });

      if (imagenUsuario !== null) {
        const idUsuario = res.data.body.usuario.usuario.uid;
        const formData = new FormData();
        formData.append("archivo", imagenUsuario, imagenUsuario.name);

        // Añadimos Imagen al producto
        await axios.put(`${baseUrl}/uploads/usuarios/${idUsuario}`, formData, {
          headers: {
            "x-token": token,
          },
        });
        setEnviado(true);
      }

      MySwal.fire({
        title: "¡Usuario agregado!",
        html: "El usuario se ha guardado exitosamente.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
      if (imagenUsuario === null) {
        setEnviado(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditarUsuario = async () => {
    let formValido = true;
    console.log(rol);
    let nuevoUsuario = {
      rol,
      estado,
    };

    if (username !== usuario.username) {
      nuevoUsuario.username = username;
    }

    if (email1 !== usuario.correo) {
      nuevoUsuario.correo = email1;
    }

    try {
      if (email1 !== email2) {
        formValido = false;
        setErrorEmail("Los emails no coinciden");
      }
      if (formValido) {
        const url = `${baseUrl}/usuarios/${usuario.uid}`;

        // console.log(username);
        const res = await axios.put(url, nuevoUsuario);
        const idUsuario = res.data.body.uid;

        if (imagenUsuario !== null) {
          const formData = new FormData();
          formData.append("archivo", imagenUsuario, imagenUsuario.name);

          // Añadimos Imagen al producto
          const usuarioActualizado = await axios.put(
            `${baseUrl}/uploads/usuarios/${idUsuario}`,
            formData,
            {
              headers: {
                "x-token": token,
              },
            }
          );
        }
        setEnviado(true);
      }
      if (imagenUsuario === null) {
        setEnviado(true);
      }
      MySwal.fire({
        title: "¡Usuario Modificado!",
        html: "El usuario se ha editado exitosamente.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
      setEnviado(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (enviado) {
    return <Navigate to='/administrar/usuarios' />;
  }

  console.log(usuario);

  return (
    <>
      <div className='PageContainer'>
        <form className='UsuarioForm'>
          <PageTitle>{!usuario ? "Agregar" : "Editar"} Usuario</PageTitle>
          <div className='FormContainer'>
            <div className='InputContainer'>
              <h2>Usuario:</h2>
              <InputText
                type='text'
                justify='center'
                value={username}
                onChange={handleSetUsername}
                onKeyDown={handlePressEnter}
                error={errorUsername}
              />
            </div>
            <div className='InputContainer'>
              <h2>Email:</h2>
              <InputText
                type='email'
                justify='center'
                value={email1}
                onChange={handleSetEmail1}
                onKeyDown={handlePressEnter}
                error={errorEmail}
              />
            </div>
            <div className='InputContainer'>
              <h2>Repetir email:</h2>
              <InputText
                type='email'
                justify='center'
                value={email2}
                onChange={handleSetEmail2}
                onKeyDown={handlePressEnter}
                error={errorEmail}
              />
            </div>
            <div className='InputContainer'>
              <h2>*Imagen de Perfil:</h2>
              <InputText
                type='file'
                // value={imagenCatalogo.name}
                onChange={handleSetImgUsuario}
                justify='center'
                onKeyDown={handlePressEnter}
                error={errorImgUsuario}
                nombreArchivo={imagenUsuario}
              />
            </div>
            {!usuario && (
              <div className='InputContainer'>
                <h2>Contraseña:</h2>
                <InputText
                  type='password'
                  justify='center'
                  value={password}
                  onChange={handleSetPassword}
                  onKeyDown={handlePressEnter}
                  error={errorPassword}
                />
              </div>
            )}
            <div className='InputContainer'>
              <h2>Rol de usuario:</h2>
              <InputText
                type='select'
                value={rol}
                lista={["Usuario", "Administrador"]}
                onChange={handleSetRol}
                justify='center'
                onKeyDown={handlePressEnter}
                selected={rol === "ADMIN_ROL" ? "Administrador" : "Usuario"}
                onlyTextValues
              />
            </div>
            {usuario && idMyUser !== usuario.uid && (
              <div className='InputContainer'>
                <h2>Estado:</h2>
                <InputText
                  type='select'
                  value={estado}
                  lista={["Activo", "Inhabilitado"]}
                  onChange={handleSetEstado}
                  justify='center'
                  onKeyDown={handlePressEnter}
                  selected={estado ? "Activo" : "Inhabilitado"}
                  onlyTextValues
                />
              </div>
            )}
            <br />
            <h3>Nota: (*) es opcional su valor.</h3>
            <div className='Buttons'>
              <Button
                onClick={!usuario ? handleAgregarUsuario : handleEditarUsuario}
                type='primary'>
                {!usuario ? "Agregar" : "Guardar"}
              </Button>
              <Link
                className='LinkCover Button LinkCard danger'
                to='/administrar/usuarios'>
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FormularioUsuario;
