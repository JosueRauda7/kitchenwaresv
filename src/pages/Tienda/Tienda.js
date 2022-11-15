import Item from "../../components/Item/Item";
import ItemImg from "../../assets/ItemExample.jpeg";
import ItemImg2 from "../../assets/ItemExample2.jpeg";
import ItemImg3 from "../../assets/ItemExample3.jpeg";
import "./Tienda.css";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../components/Dashboard/Dashboard";
import axios from "axios";

const Tienda = (props) => {
  const [isShowModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);

  // Get de productos
  useEffect(() => {
    const getProductos = async () => {
      const productosItems = await axios.get(
        "http://localhost:8080/api/productos"
      );
      setProductos(productosItems.data.body.productos);
    };
    getProductos();
  }, []);

  const handleModal = (descripcion) => {};

  return (
    <div>
      <div className='Tienda'>
        <Dashboard />
        <div className='TiendaContainer'>
          <PageTitle>Productos</PageTitle>
          <div className='itemContainer'>
            {productos.map((producto) => (
              <Item
                key={producto._id}
                img={ItemImg}
                title={producto.nombre}
                precio={producto.precio}
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
