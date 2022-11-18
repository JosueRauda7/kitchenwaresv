import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Item from "../../components/Item/Item";
import ItemImg from "../../assets/ItemExample.jpeg";
// import ItemImg2 from "../../assets/ItemExample2.jpeg";
// import ItemImg3 from "../../assets/ItemExample3.jpeg";
import "./Tienda.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../components/Dashboard/Dashboard";
import { baseUrlDevelopment } from "../../apiConfig";
import { CarritoContext } from "../../contexts/CarritoContext";

const Tienda = (props) => {
  // const [isShowModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const { carrito, setCarrito } = useContext(CarritoContext);

  // Get de productos
  useEffect(() => {
    const getProductos = async () => {
      const url = `${baseUrlDevelopment}/productos`;
      const productosItems = await axios.get(url);
      setProductos(productosItems.data.body.productos);
    };
    getProductos();
  }, []);

  const handleAnidarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // const handleModal = (descripcion) => {};

  return (
    <div>
      <div className='Tienda'>
        <Dashboard />
        <div className='TiendaContainer'>
          <PageTitle>Productos</PageTitle>
          <div className='itemContainer'>
            {productos.map((producto, id) => (
              <Item
                key={id}
                img={ItemImg}
                title={producto.nombre}
                precio={producto.precio}
                anidarCarrito={() => handleAnidarCarrito(producto)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tienda;
