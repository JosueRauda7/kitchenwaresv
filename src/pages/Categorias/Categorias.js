import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
// Importando SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { baseUrl, urlImages } from "../../apiConfig";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item/Item";
import PageTitle from "../../components/PageTitle/PageTitle";
import NotImg from "../../assets/NotImg.jpg";
import { CarritoContext } from "../../contexts/CarritoContext";
import Loading from "../../components/Loading/Loading";

const Categorias = (props) => {
  const [categoria, setCategoria] = useState({});
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { search } = useLocation();
  const categoriaIndexSearch = search.indexOf("categoria");
  const idCategoria = search.split(/\?|=|&/)[categoriaIndexSearch + 1];
  const getProductosCategorias = async (idCat) => {
    const url = `${baseUrl}/categorias/${idCat}`;
    const res = await axios.get(url);
    setCategoria(res.data.body.categoria);
    setProductos(res.data.body.categoria.productos);
    setIsLoading(false);
  };
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getProductosCategorias(idCategoria);
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
            {isLoading ? (
              <Loading />
            ) : productos.length === 0 ? (
              <h2 style={{ marginTop: "20px" }}>
                No se encuentran productos de esta categoria.
              </h2>
            ) : (
              productos.map((producto, id) => (
                <Item
                  key={id}
                  img={
                    producto.img
                      ? `${urlImages}/uploads/productos/${producto.img}`
                      : NotImg
                  }
                  id={producto._id}
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

export default Categorias;
