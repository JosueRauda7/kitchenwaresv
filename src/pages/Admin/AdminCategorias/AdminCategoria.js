import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../apiConfig";

import Button from "../../../components/Button/Button";
import Footer from "../../../components/Footer/Footer";
import List from "../../../components/List/List";
import PageTitle from "../../../components/PageTitle/PageTitle";
import "../AdminColeccion.css";

const AdminCategoria = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategorias = async () => {
      const url = `${baseUrl}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
      setIsLoading(false);
    };
    getCategorias();
  }, []);

  const handleEnviado = () => {
    const getCategorias = async () => {
      const url = `${baseUrl}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
      setIsLoading(false);
    };
    getCategorias();
  };

  return (
    <>
      <div className='PageContainer'>
        <div className='AdminColeccionContainer'>
          <PageTitle>Catalogos</PageTitle>
          <div className='BodyAdminColeccion'>
            <div className='ButtonNuevoColeccion'>
              <Link to='/administrar/categorias/agregar' className='LinkCover'>
                <Button type='primary' icono={<AddBoxIcon fontSize='large' />}>
                  Nueva Categoria
                </Button>
              </Link>
            </div>
            <div className='TableCatalogo'>
              <List
                isLoading={isLoading}
                header={["Imagen", "Nombre", "Operaciones"]}
                categorias={categorias}
                handleEnviado={handleEnviado}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminCategoria;
