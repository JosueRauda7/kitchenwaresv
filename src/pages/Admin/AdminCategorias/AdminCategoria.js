import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../apiConfig";

import Button from "../../../components/Button/Button";
import Footer from "../../../components/Footer/Footer";
import List from "../../../components/List/List";
import PageTitle from "../../../components/PageTitle/PageTitle";
import "./AdminCategoria.css";

const AdminCategoria = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getCategorias = async () => {
      const url = `${baseUrl}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
    };
    getCategorias();
  }, []);

  const handleReload = () => {
    setReload(true);
  };

  useEffect(() => {
    const getCategorias = async () => {
      const url = `${baseUrl}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
    };
    getCategorias();
  }, [handleReload]);

  return (
    <>
      <div className='PageContainer'>
        <div className='AdminCatalogoContainer'>
          <PageTitle>Catalogos</PageTitle>
          <div className='BodyAdminCatalogo'>
            <div className='ButtonNuevoCatalogo'>
              <Link to='/administrar/categorias/agregar' className='LinkCover'>
                <Button type='primary' icono={<AddBoxIcon fontSize='large' />}>
                  Nuevo Catalogo
                </Button>
              </Link>
            </div>
            <div className='TableCatalogo'>
              <List
                header={["Imagen", "Nombre", "Operaciones"]}
                categorias={categorias}
                setReload={handleReload}
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
