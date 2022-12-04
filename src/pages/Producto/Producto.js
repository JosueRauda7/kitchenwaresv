import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { baseUrl, urlImages } from "../../apiConfig";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";
import NotImg from "../../assets/NotImg.jpg";

import "./Producto.css";
import Button from "../../components/Button/Button";
import { CarritoContext } from "../../contexts/CarritoContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import Footer from "../../components/Footer/Footer";

const Producto = (props) => {
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const categoriaIndexSearch = search.indexOf("producto");
  const idProducto = search.split(/\?|=|&/)[categoriaIndexSearch + 1];

  const MySwal = withReactContent(Swal);

  const getProducto = async (idProd) => {
    try {
      const url = `${baseUrl}/productos/${idProd}`;
      const res = await axios.get(url);
      setProducto(res.data.body.producto);
      const res2 = await axios.get(
        `${baseUrl}/categorias/${res.data.body.producto.categoria}`
      );
      const category = await res2.data.body.categoria;
      setCategoria(category);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getProducto(idProducto);
  }, []);

  const handleMore = () => {
    if (cantidad < 1) {
      return;
    }
    setCantidad(cantidad + 1);
  };

  const handleLess = () => {
    if (cantidad <= 1) {
      return;
    }
    setCantidad(cantidad - 1);
  };

  const handleAnidarCarrito = (product) => {
    let banderaAgregar = true;
    if (carrito.length === 0) {
      product.cantidad = cantidad;
    }
    carrito.map((p) => {
      product.cantidad = cantidad;
      if (p._id === product._id) {
        p.cantidad += cantidad;
        banderaAgregar = false;
        return p;
      }
    });
    if (banderaAgregar) {
      setCarrito([...carrito, product]);
    }
    MySwal.fire({
      title: "¡Producto agregado!",
      html: "Se ha guardado en el carrito.",
      icon: "success",
      timer: "1400",
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className='PageContainer'>
        <div className='ProductoContainer'>
          <div className='GaleriaProducto'>
            <img
              src={
                producto.img
                  ? `${urlImages}/uploads/productos/${producto.img}`
                  : NotImg
              }
              alt={producto.nombre}
            />
          </div>
          <div className='ProductoInfo'>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <PageTitle>{producto.nombre}</PageTitle>
                <div className='BodyProducto'>
                  <h2 className='CategoriaProducto'>
                    Categoria: {categoria.nombre}
                  </h2>
                  <div className='CatacteristicaItem'>
                    <h2>Descripción de producto</h2>
                    <p>{producto.descripcion}</p>
                  </div>
                  <div className='CatacteristicaItem'>
                    <h2>Detalles</h2>
                    {!producto.detalles ? (
                      <p>No hay detalles</p>
                    ) : (
                      producto.detalles.map((detalle, index) => (
                        <div className='Detalle' key={index}>
                          <p className='Variable'>{`- ${detalle.variable}: `}</p>
                          <p>{`${detalle.valor}`}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className='CatacteristicaItem'>
                    <h2>Precio</h2>
                    <p>{producto.precio.toFixed(2)} USD$</p>
                  </div>
                  <div className='CatacteristicaItem Disponibilidad'>
                    <h2>Disponibilidad:</h2>
                    <p>
                      {producto.stock > 0 ? (
                        <span className='bg-green'>En Existencia</span>
                      ) : (
                        <span className='bg-red'>Agotado</span>
                      )}
                    </p>
                  </div>
                  <div className='CatacteristicaItem'>
                    <div className='Buttons'>
                      <h2>Cantidad: </h2>
                      <Button
                        type='primary ButtonPlus'
                        style={{ height: "2px" }}
                        onClick={handleMore}>
                        +
                      </Button>
                      <p className='CarritoCantidad'>{cantidad}</p>
                      <Button type='primary ButtonLess' onClick={handleLess}>
                        -
                      </Button>
                    </div>
                  </div>
                  <div className='ButtonContainer'>
                    <Button
                      type='primary'
                      icono={<ShoppingCartIcon />}
                      onClick={() => handleAnidarCarrito(producto)}>
                      Añadir al carrito
                    </Button>
                    <Button
                      type='secondary'
                      icono={<ShoppingBagIcon />}
                      onClick={() => handleAnidarCarrito(producto)}>
                      Comprar producto
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Producto;
