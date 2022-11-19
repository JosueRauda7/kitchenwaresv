import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { baseUrlProduction } from "../../apiConfig";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item/Item";
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemImg from "../../assets/ItemExample.jpeg";
import { CarritoContext } from "../../contexts/CarritoContext";

const Categorias = (props) => {
  const [categoria, setCategoria] = useState({});
  const [productos, setProductos] = useState([]);
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { search } = useLocation();
  const categoriaIndexSearch = search.indexOf("categoria");
  const idCategoria = search.split(/\?|=|&/)[categoriaIndexSearch + 1];
  const getProductosCategorias = async (idCat) => {
    const url = `${baseUrlProduction}/categorias/${idCat}`;
    const res = await axios.get(url);
    setCategoria(res.data.body.categoria);
    setProductos(res.data.body.categoria.productos);
  };

  useEffect(() => {
    getProductosCategorias(idCategoria);
  }, []);

  const handleAnidarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const handleSelectCategory = (id) => {
    getProductosCategorias(id);
  };

  return (
    <div className=''>
      <div className='Tienda'>
        <Dashboard onSelectCategory={handleSelectCategory} />
        <div className='TiendaContainer'>
          <PageTitle>{categoria.nombre}</PageTitle>
          <div className='itemContainer'>
            {productos.length === 0 ? (
              <h2 style={{ marginTop: "20px" }}>
                No se encuentran productos de esta categoria.
              </h2>
            ) : (
              productos.map((producto, id) => (
                <Item
                  key={id}
                  img={producto.img || ItemImg}
                  title={producto.nombre}
                  precio={producto.precio}
                  anidarCarrito={() => handleAnidarCarrito(producto)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categorias;
