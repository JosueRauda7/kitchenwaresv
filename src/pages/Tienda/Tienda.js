import axios from "axios";
import { useContext, useEffect, useState } from "react";
// Importando SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Item from "../../components/Item/Item";
import NotImg from "../../assets/NotImg.jpg";
import "./Tienda.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../components/Dashboard/Dashboard";
import { CarritoContext } from "../../contexts/CarritoContext";
import { urlImages, baseUrl } from "../../apiConfig";
import Loading from "../../components/Loading/Loading";

const Tienda = (props) => {
  // const [isShowModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [isLoading, setIsLoading] = useState(true);
  const MySwal = withReactContent(Swal);

  // Get de productos
  useEffect(() => {
    const getProductos = async () => {
      const url = `${baseUrl}/productos`;
      const productosItems = await axios.get(url);
      setProductos(productosItems.data.body.productos);
      setIsLoading(false);
    };
    getProductos();
  }, []);

  const handleAnidarCarrito = (producto) => {
    let banderaAgregar = true;
    if (carrito.length === 0) {
      producto.cantidad = 1;
    }
    carrito.map((p) => {
      producto.cantidad = 1;
      if (p._id === producto._id) {
        p.cantidad += 1;
        banderaAgregar = false;
        return p;
      }
    });
    if (banderaAgregar) {
      setCarrito([...carrito, producto]);
    }
    MySwal.fire({
      title: "¡Producto agregado!",
      html: "Se ha guardado en el carrito.",
      icon: "success",
      timer: "1400",
      showConfirmButton: false,
    });
  };

  // const handleModal = (descripcion) => {};

  return (
    <div>
      <div className='Tienda'>
        <Dashboard />
        <div className='TiendaContainer'>
          <PageTitle>Productos</PageTitle>
          <div className='itemContainer'>
            {isLoading ? (
              <Loading />
            ) : (
              productos.map((producto, id) => (
                <Item
                  key={id}
                  img={
                    producto.img
                      ? `${urlImages}/uploads/productos/${producto.img}`
                      : NotImg
                  }
                  title={producto.nombre}
                  precio={producto.precio}
                  titleButton='Añadir al carrito'
                  onClick={() => handleAnidarCarrito(producto)}
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

export default Tienda;
