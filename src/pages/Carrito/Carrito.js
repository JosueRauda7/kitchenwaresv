import { useContext } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { CarritoContext } from "../../contexts/CarritoContext";
import NoImage from "../../assets/ItemExample.jpeg";
import "./Carrito.css";
import { urlImages } from "../../apiConfig";
import Button from "../../components/Button/Button";

export const CarritoItem = (props) => {
  return (
    <div className='CarritoItem'>
      <div className='CarritoItemImagen'>
        <img src={props.img} />
      </div>
      <div className='CarritoItemBody'>
        <h2>{props.nombre}</h2>
        <p>${props.precio}</p>
        <p>
          Cantidad:{" "}
          <div className='Buttons'>
            <Button type='primary' style={{ height: "2px" }}>
              +
            </Button>
            {props.cantidad}
            <Button type='primary'>-</Button>
          </div>
        </p>
      </div>
    </div>
  );
};

const Cart = (props) => {
  const { carrito, setCarrito } = useContext(CarritoContext);

  return (
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
                img={
                  producto.img
                    ? `${urlImages}/uploads/productos/${producto.img}`
                    : NoImage
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
