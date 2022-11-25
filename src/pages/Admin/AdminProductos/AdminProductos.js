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

const AdminProductos = (props) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductos = async () => {
    const url = `${baseUrl}/productos?limit=15`;
    const res = await axios.get(url);
    const prods = res.data.body.productos;
    setProductos(prods);
  };

  useEffect(() => {
    setIsLoading(true);
    getProductos();
    const cargarCategorias = async () => {
      const res3 = await axios.get(`${baseUrl}/categorias`);
      const categories = await res3.data.body.categorias;
      setCategorias(categories);
      setIsLoading(false);
    };
    cargarCategorias();
  }, []);

  const handleEnviado = () => {
    setIsLoading(true);
    getProductos();
    setIsLoading(false);
  };

  return (
    <>
      <div className='PageContainer'>
        <div className='AdminColeccionContainer'>
          <PageTitle>Productos</PageTitle>
          <div className='BodyAdminColeccion'>
            <div className='ButtonNuevoColeccion'>
              <Link to='/administrar/productos/agregar' className='LinkCover'>
                <Button type='primary' icono={<AddBoxIcon fontSize='large' />}>
                  Nuevo Producto
                </Button>
              </Link>
            </div>
            <div className='TableCatalogo'>
              <List
                isLoading={isLoading}
                header={[
                  "Imagen",
                  "Nombre",
                  "Descripción",
                  "Detalles",
                  "Precio",
                  "Categoria",
                  "Operaciones",
                ]}
                handleEnviado={handleEnviado}
                productos={productos}
                categoriasProductos={categorias}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProductos;
