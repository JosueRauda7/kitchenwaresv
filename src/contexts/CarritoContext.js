import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoContextProvider = (props) => {
  const [carrito, setCarrito] = useState([]);
  const valor = { carrito, setCarrito };

  return (
    <CarritoContext.Provider value={valor}>
      {props.children}
    </CarritoContext.Provider>
  );
};
