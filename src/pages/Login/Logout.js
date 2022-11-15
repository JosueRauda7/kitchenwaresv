import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { UsuarioContext } from "../../contexts/UsuarioContext";

const Logout = (props) => {
  const { setIsLogged, setUsuario } = useContext(UsuarioContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLogged(false);
    setUsuario("");
  }, []);
  return <Navigate to='/login' />;
};

export default Logout;
