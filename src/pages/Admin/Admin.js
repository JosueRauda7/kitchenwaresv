import { useContext } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";

import PageTitle from "../../components/PageTitle/PageTitle";
import PanelButton from "../../components/PanelButton/PanelButton";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import "./AdminInicio.css";
import Footer from "../../components/Footer/Footer";

const Admin = (props) => {
  const { usuario } = useContext(UsuarioContext);

  return (
    <>
      <div className='PageContainer'>
        <div className='AdministrarContainer'>
          <PageTitle>Bienvenido, {usuario}</PageTitle>
          <div className='AdminPanelBody'>
            <h1>¿Qué tarea desea realizar?</h1>
            <div className='AdministrarPanel'>
              <PanelButton
                to='/administrar/productos'
                title='Administrar Productos'
                icono={<Inventory2Icon sx={{ fontSize: "100px" }} />}
              />
              <PanelButton
                to='/administrar/categorias'
                title='Administrar Categorias'
                icono={<CategoryIcon sx={{ fontSize: "100px" }} />}
              />
              <PanelButton
                to='/administrar/usuarios'
                title='Administrar Usuarios'
                icono={<PeopleAltIcon sx={{ fontSize: "100px" }} />}
              />
              <PanelButton
                to='/administrar/ordenes'
                title='Ver Ordenes'
                icono={<ListAltIcon sx={{ fontSize: "100px" }} />}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
