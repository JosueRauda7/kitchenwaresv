import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu/Menu";
import LandingPage from "./pages/LandingPage/LandingPage";
import Tienda from "./pages/Tienda/Tienda";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className='App'>
      <Menu />
      {/* <LandingPage /> */}
      {/* <Tienda /> */}
      <Login />
    </div>
  );
}

export default App;
