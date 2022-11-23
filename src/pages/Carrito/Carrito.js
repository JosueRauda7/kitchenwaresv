import { useContext, useEffect, useState } from "react";
// Importando SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PageTitle from "../../components/PageTitle/PageTitle";
import { CarritoContext } from "../../contexts/CarritoContext";
import NoImage from "../../assets/ItemExample.jpeg";
import "./Carrito.css";
import { urlImages } from "../../apiConfig";
import Button from "../../components/Button/Button";
import Delete from "@mui/icons-material/Delete";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

export const ResumenOrden = (props) => {
  return (
    <div className='ResumenOrden'>
      <h3>Total:</h3>
      <p className='precioTotal'>
        {props.total === 0 ? "0.00 US$" : `${props.total.toFixed(2)} US$`}
      </p>
      {props.descuento && (
        <>
          <p className='descuentoPrecioReal'>{`${props.total.toFixed(
            2
          )} US$`}</p>
          <p className='descuento'>{`${props.descuento}% de descuento`}</p>
        </>
      )}
      <Link className='Button primary LinkButton LinkCard' to='/ordenar'>
        Pagar
      </Link>
    </div>
  );
};

export const CarritoItem = (props) => {
  return (
    <div className='CarritoItem'>
      <div className='CarritoItemImagen'>
        <img src={props.img} />
      </div>
      <div className='CarritoItemBody'>
        <h2>{props.nombre}</h2>
        <p>${props.precio} c/u</p>
        <div className='Buttons'>
          <p>Cantidad: </p>
          <Button
            type='primary ButtonPlus'
            style={{ height: "2px" }}
            onClick={props.handleMore}>
            +
          </Button>
          <p className='CarritoCantidad'>{props.cantidad}</p>
          <Button type='primary ButtonLess' onClick={props.handleLess}>
            -
          </Button>
        </div>
      </div>
      <div className='CarritoItemBorrar'>
        <Button type='primary ButtonDelete' onClick={props.deleteItem}>
          <Delete fontSize='medium' />
        </Button>
      </div>
    </div>
  );
};

const Cart = (props) => {
  const [total, setTotal] = useState(0);
  const { carrito, setCarrito } = useContext(CarritoContext);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    let totalInicial = 0;
    carrito.map((p) => {
      totalInicial += p.precio * p.cantidad;
    });
    setTotal(totalInicial);
  }, []);

  const handleMore = (product) => {
    if (product.cantidad < 1) {
      return;
    }
    carrito.map((p) => {
      if (p._id === product._id) {
        p.cantidad += 1;
        setTotal(total + product.precio);
        return p;
      }
    });
    setCarrito([...carrito]);
  };

  const handleLess = (product) => {
    if (product.cantidad <= 1) {
      return;
    }
    carrito.map((p) => {
      if (p._id === product._id) {
        p.cantidad -= 1;
        setTotal(total - product.precio);
        return p;
      }
    });
    setCarrito([...carrito]);
  };

  const handleDeleteItem = (product) => {
    const nuevoCarrito = carrito.filter((p) => p._id !== product._id);
    setCarrito(nuevoCarrito);
    setTotal(total - (product.precio * product.cantidad))
  };

  const handleAskToDelete = (product) => {
    MySwal.fire({
      title: "¿Deseas eliminar este producto del carrito?",
      text: `\"${product.nombre}\" ya no apareceraen el carrito.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0652DD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteItem(product);
        MySwal.fire(
          "¡Eliminado del carrito!",
          "Este producto se ha removido del carrito.",
          "success"
        );
      }
    });
  };

  return (
    <>
      <div className='CarritoContainer'>
        <PageTitle>Carrito de compras</PageTitle>
        <div className='CarritoBody'>
          <div className='CarritoItemsContainer'>
            {carrito.length === 0 ? (
              <h2 style={{ marginTop: "20px" }}>
                El carrito está vacío, no hay productos por el momento.
              </h2>
            ) : (
              carrito.map((producto, id) => (
                <CarritoItem
                  key={id}
                  style={{ marginTop: "20px" }}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  cantidad={producto.cantidad}
                  handleMore={() => handleMore(producto)}
                  handleLess={() => handleLess(producto)}
                  deleteItem={() => handleAskToDelete(producto)}
                  img={
                    producto.img
                      ? `${urlImages}/uploads/productos/${producto.img}`
                      : NoImage
                  }
                />
              ))
            )}
          </div>
          <ResumenOrden className='ResumenOrden' total={total} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
