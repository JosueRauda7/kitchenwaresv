import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import InputText from "../../components/InputText/InputText";
import PageTitle from "../../components/PageTitle/PageTitle";

import "./Login.css";
import Logo from "../../assets/logo_positivo.png";
import Button from "../../components/Button/Button";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { baseUrlProduction } from "../../apiConfig";

const Login = (props) => {
  const { isLogged, setIsLogged, setUsuario, setRolUsuario, setImgUsuario } =
    useContext(UsuarioContext);
  const [showLogin, setShowLogin] = useState(!props.showRegistrar);
  const [username, setUsername] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  useEffect(() => {
    setShowLogin(!props.showRegistrar);
  }, [props.showRegistrar]);

  const validarErrores = (error) => {
    if (error.response.data.errores.errors) {
      let errores = error.response.data.errores.errors;
      errores.map((err) => {
        switch (err.param) {
          case "username":
            setErrorUsername(err.msg);
            break;
          case "correo":
            setErrorEmail(err.msg);
            break;
          case "password":
            setErrorPassword(err.msg);
            break;
        }
      });
    } else {
      console.log(error);
    }
  };

  const resetearErrores = () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
  };

  const handleShowRegistrar = () => {
    setUsername("");
    setEmail1("");
    setEmail2("");
    setPassword("");
    resetearErrores();
    setShowLogin(!showLogin);
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      if (showLogin) {
        await handleLogin();
      } else {
        await handleRegistrar();
      }
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

  const handleSetPassword = (e) => {
    setErrorPassword("");
    setPassword(e.target.value);
  };

  const handleRegistrar = async () => {
    resetearErrores();
    let formValido = true;
    try {
      if (email1 !== email2) {
        formValido = false;
        setErrorEmail("Los emails no coinciden");
      }
      if (formValido) {
        const usuario = {
          username,
          correo: email1,
          password,
        };

        const url = `${baseUrlProduction}/auth/register`;

        // console.log(username);
        const res = await axios.post(url, usuario);
        const token = res.data.body.token;
        const nombreUsuario = res.data.body.usuario.usuario.username;
        localStorage.setItem("token", token);
        localStorage.setItem("username", nombreUsuario);
        setUsuario(nombreUsuario);
        setIsLogged(true);
      }
    } catch (error) {
      validarErrores(error);
    }
  };

  const handleLogin = async () => {
    resetearErrores();
    try {
      const user = {
        username,
        password,
      };

      const url = `${baseUrlProduction}/auth/login`;
      const res = await axios.post(url, user);
      const token = res.data.body.token;
      const idUsuario = res.data.body.usuario.usuario.uid;
      const nombreUsuario = res.data.body.usuario.usuario.username;
      const rolUsuario = res.data.body.usuario.usuario.rol;
      const imagenUsuario = res.data.body.usuario.usuario.img;
      localStorage.setItem("token", token);
      localStorage.setItem("username", nombreUsuario);
      localStorage.setItem("idUsuario", idUsuario);
      setUsuario(nombreUsuario);
      setRolUsuario(rolUsuario);
      setIsLogged(true);
      setImgUsuario(imagenUsuario);
    } catch (error) {
      validarErrores(error);
    }
  };

  return isLogged ? (
    <Navigate to='/' />
  ) : (
    <div>
      <div className='Login'>
        <div className='Container'>
          <div className='LoginImage'>
            <div className='TextoResaltar'>
              <img src={Logo} />
              <h1>"Distinción y calidad en tu mesa"</h1>
            </div>
          </div>
          {showLogin ? (
            <form className='LoginForm'>
              <PageTitle>Iniciar Sesión</PageTitle>
              <div className='InputContainer'>
                <h2>Usuario:</h2>
                <InputText
                  type='text'
                  value={username}
                  onChange={handleSetUsername}
                  justify='center'
                  onKeyDown={handlePressEnter}
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
                />
              </div>
              {errorUsername ? (
                <ErrorMessageBox>Usuario no existe</ErrorMessageBox>
              ) : null}
              {errorPassword ? (
                <ErrorMessageBox>Contraseña incorrecta</ErrorMessageBox>
              ) : null}
              <Button onClick={handleLogin} type='primary'>
                Ingresar
              </Button>
              <div className='Buttons'>
                <p className='Pregunta'>¿No tienes una cuenta?</p>
                <Button onClick={handleShowRegistrar} type='info'>
                  Registrate
                </Button>
              </div>
            </form>
          ) : (
            <form className='RegistroForm'>
              <PageTitle>Registrarse</PageTitle>
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

              <Button onClick={handleRegistrar} type='primary'>
                Registrarse
              </Button>
              <div className='Buttons'>
                <p className='Pregunta'>¿Ya tienes una cuenta?</p>
                <Button onClick={handleShowRegistrar} type='info'>
                  Iniciar Sesión
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
