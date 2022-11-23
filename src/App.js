import "./App.css";
import Menu from "./components/Menu/Menu";
import LandingPage from "./pages/LandingPage/LandingPage";
import Tienda from "./pages/Tienda/Tienda";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Carrito from "./components/Cart/Cart";
import Logout from "./pages/Login/Logout";
import { useContext, useState } from "react";
import { UsuarioContext } from "./contexts/UsuarioContext";
import Categorias from "./pages/Categorias/Categorias";
import Cart from "./pages/Carrito/Carrito";
import Usuario from "./pages/Usuario/Usuario";
import PageNotFound from "./pages/404Page/404Page";
import Admin from "./pages/Admin/Admin";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const { isLogged, rolUsuario } = useContext(UsuarioContext);

  const handleShowSubMenu = () => {
    setIsClicked(!isClicked);
  };

  const handleShowHide = () => {
    if (isClicked) {
      setIsClicked(false);
    }
  };

  return (
    <div className='App'>
      <Menu
        onClickedToShow={handleShowSubMenu}
        onClickedToHide={handleShowHide}
        isClicked={isClicked}
      />
      <Carrito onClick={() => setIsClicked(false)} />
      <div onClick={() => setIsClicked(false)}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/tienda' element={<Tienda />} />
          <Route path='/tienda/:categoriaNombre' element={<Categorias />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registrar' element={<Login showRegistrar />} />
          <Route path='/logout' element={<Logout />} />
          {rolUsuario === "ADMIN_ROL" && isLogged ? (
            <Route path='/administrar' element={<Admin />} />
          ) : null}
          {isLogged ? <Route path='/profile' element={<Usuario />} /> : null}
          {isLogged ? (
            <Route path='/profile/edit' element={<Usuario />} />
          ) : null}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
