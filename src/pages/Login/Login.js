import InputText from "../../components/InputText/InputText";
import PageTitle from "../../components/PageTitle/PageTitle";

import "./Login.css";
import Logo from "../../assets/logo_positivo.png";
import Button from "../../components/Button/Button";
import { useState } from "react";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleShowRegistrar = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <div className='Login'>
        <div className='Container'>
          <div className='LoginImage'>
            <div className='TextoResaltar'>
              <img src={Logo} />
              <h1>"Distinción y calidad en tu mesa"</h1>
            </div>
          </div>
          {isLogin ? (
            <form className='LoginForm'>
              <PageTitle>Iniciar Sesión</PageTitle>
              <div className='InputContainer'>
                <h2>Usuario:</h2>
                <InputText type='text' justify='center' />
              </div>
              <div className='InputContainer'>
                <h2>Contraseña:</h2>
                <InputText type='password' justify='center' />
              </div>

              <div className='Buttons'>
                <Button type='primary'>Ingresar</Button>
                <Button onClick={handleShowRegistrar} type='add'>
                  Registrarse
                </Button>
              </div>
            </form>
          ) : (
            <form className='RegistroForm'>
              <PageTitle>Registrarse</PageTitle>
              <div className='InputContainer'>
                <h2>Usuario:</h2>
                <InputText type='text' justify='center' />
              </div>
              <div className='InputContainer'>
                <h2>Email:</h2>
                <InputText type='email' justify='center' />
              </div>
              <div className='InputContainer'>
                <h2>Repetir email:</h2>
                <InputText type='email' justify='center' />
              </div>
              <div className='InputContainer'>
                <h2>Contraseña:</h2>
                <InputText type='password' justify='center' />
              </div>

              <div className='Buttons'>
                <Button type='primary'>Registrarse</Button>
                <Button onClick={handleShowRegistrar} type='add'>
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
