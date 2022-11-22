import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { UsuarioContext } from "../../contexts/UsuarioContext";

const Logout = (props) => {
  const { setIsLogged, setUsuario, setImgUsuario, setRolUsuario } =
    useContext(UsuarioContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("idUsuario");
    setIsLogged(false);
    setUsuario("");
    setRolUsuario("");
    setImgUsuario("");
  }, []);
  return <Navigate to='/login' />;
};

export default Logout;
