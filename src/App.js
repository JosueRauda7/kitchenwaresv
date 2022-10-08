import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu/Menu";
import LandingPage from "./pages/LandingPage/LandingPage";
import Tienda from "./pages/Tienda/Tienda";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Carrito from "./components/Cart/Cart";

function App() {
  return (
    <div className='App'>
      <Menu />
      <Carrito />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
