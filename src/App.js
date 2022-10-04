import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu/Menu";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div className='App'>
      <Menu />
      <LandingPage />
    </div>
  );
}

export default App;
