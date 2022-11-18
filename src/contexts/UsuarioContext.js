import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = (props) => {
  const [usuario, setUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("USER_ROL");
  const [isLogged, setIsLogged] = useState(false);
  const valor = {
    isLogged,
    setIsLogged,
    usuario,
    setUsuario,
    rolUsuario,
    setRolUsuario,
  };
  return (
    <UsuarioContext.Provider value={valor}>
      {props.children}
    </UsuarioContext.Provider>
  );
};
