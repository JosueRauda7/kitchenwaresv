import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu/Menu";
import LandingPage from "./pages/LandingPage/LandingPage";
import Tienda from "./pages/Tienda/Tienda";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Carrito from "./components/Cart/Cart";
import Logout from "./pages/Login/Logout";
import { useContext } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import Categorias from "./pages/Categorias/Categorias";
import Cart from "./pages/Carrito/Carrito";

function App() {
  const { rolUsuario, setRolUsuario } = useContext(UsuarioContext);
  return (
    <div className='App'>
      <Menu />
      <Carrito />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/tienda/:categoriaNombre' element={<Categorias />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
