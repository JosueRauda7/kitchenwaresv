import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { baseUrl } from "../../apiConfig";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import InputText from "../../components/InputText/InputText";
import PageTitle from "../../components/PageTitle/PageTitle";
import UserIcon from "../../components/UserIcon/UserIcon";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import "./Usuario.css";

const EditarUsuario = (props) => {
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const { imgUsuario, usuario, setImgUsuario, setUsuario, rolUsuario } =
    useContext(UsuarioContext);
  const [enviado, setEnviado] = useState(false);
  const [username, setUsername] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [imagenUsuario, setImagenUsuario] = useState(null);
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorImgUsuario, setErrorImgUsuario] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);

  const MySwal = withReactContent(Swal);

  const ID_USER = localStorage.getItem("idUsuario");
  const getUsuarioInfo = async (id) => {
    const res = await axios.get(`${baseUrl}/usuarios/${id}`);
    const user = res.data.body.usuario.usuario;
    setUsuarioInfo(user);
    setUsername(user.username);
    setEmail1(user.correo);
    setEmail2(user.correo);
    console.log(usuario);
  };

  useEffect(() => {
    resetearErrores();
    getUsuarioInfo(ID_USER);
  }, []);

  const resetearErrores = () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorImgUsuario("");
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      handleEditar();
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

  const validarErrores = (error) => {
    // if (error.response.data.errores.errors) {
    //   let errores = error.response.data.errores.errors;
    //   errores.map((err) => {
    //     switch (err.param) {
    //       case "username":
    //         setErrorUsername(err.msg);
    //         break;
    //       case "correo":
    //         setErrorEmail(err.msg);
    //         break;
    //       case "password":
    //         setErrorPassword(err.msg);
    //         break;
    //     }
    //   });
    // } else {
    console.log(error);
    // }
  };

  const handleEditar = async () => {
    resetearErrores();
    let formValido = true;
    let nuevoUsuario = {
      rol: rolUsuario,
    };

    if (username !== usuarioInfo.username) {
      nuevoUsuario.username = username;
    }

    if (email1 !== usuarioInfo.correo) {
      nuevoUsuario.correo = email1;
    }

    // nuevo{
    //   username,
    //   correo: email1,
    //   rol: rolUsuario,
    // };
    if (password.length > 0) {
      nuevoUsuario.password = password;
    }

    try {
      if (email1 !== email2) {
        formValido = false;
        setErrorEmail("Los emails no coinciden");
      }
      if (formValido) {
        const url = `${baseUrl}/usuarios/${usuarioInfo.uid}`;

        // console.log(username);
        const res = await axios.put(url, nuevoUsuario);
        const idUsuario = res.data.body._id;
        localStorage.setItem("username", username);
        setUsuario(username);

        if (imagenUsuario !== null) {
          const token = localStorage.getItem("token");
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
          setImgUsuario(usuarioActualizado.data.modelo.usuario.img);
        }
        setEnviado(true);
      }
      if (imagenUsuario === null) {
        setEnviado(true);
      }
      MySwal.fire({
        title: "¡Tu usuario ha sido editado!",
        html: "Se ha guardado las modificaciones.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
    } catch (error) {
      validarErrores(error);
    }
  };

  if (enviado) {
    return <Navigate to='/profile' />;
  }

  return (
    <>
      <div className='PageContainer'>
        <div className='UsuarioContainer'>
          <div className='InformacionUsuario'>
            <div className='ImgUsuarioContainer'>
              <UserIcon img={imgUsuario} size='large' />
            </div>
            <h2 className='UsernameUsuario'>{usuario}</h2>
            <p className='CorreoUsuario'>{usuarioInfo.correo}</p>
            <Link
              to={`/profile`}
              className='Button primary LinkCard LinkButton EditProfileButton'>
              Ver Perfil
            </Link>
          </div>
          <div className='DatosUsuario FormUsuario'>
            <PageTitle>Editar Perfil</PageTitle>
            <div className='DatosUsuarioBody'>
              <form className='EditarPerfilForm'>
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
                <br />
                <h3>Nota: (*) es opcional su valor.</h3>
                <div className='Buttons'>
                  <Button onClick={handleEditar} type='primary'>
                    Guardar
                  </Button>
                  <Link
                    className='LinkCover Button LinkCard danger'
                    to='/profile'>
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditarUsuario;
