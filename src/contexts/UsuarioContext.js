import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = (props) => {
  const [usuario, setUsuario] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const valor = { isLogged, setIsLogged, usuario, setUsuario };
  return (
    <UsuarioContext.Provider value={valor}>
      {props.children}
    </UsuarioContext.Provider>
  );
};
