import { useContext } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { CarritoContext } from "../../contexts/CarritoContext";
import NoImage from "../../assets/ItemExample.jpeg";
import "./Carrito.css";

export const CarritoItem = (props) => {
  return (
    <div className='CarritoItem'>
      <div className='CarritoItemImagen'>
        <img src={props.img} />
      </div>
      <div className='CarritoItemBody'>
        <h2>{props.nombre}</h2>
        <span>${props.precio}</span>
      </div>
    </div>
  );
};

const Cart = (props) => {
  const { carrito, setCarrito } = useContext(CarritoContext);

  return (
    <div className='CarritoContainer'>
      <PageTitle>Carrito de compras</PageTitle>
      <div className='CarritoItemsContainer'>
        {!carrito ? (
          <h2 style={{ marginTop: "20px" }}>
            No se encuentran productos de esta categoria.
          </h2>
        ) : (
          carrito.map((producto, id) => (
            <CarritoItem
              key={producto.id}
              style={{ marginTop: "20px" }}
              nombre={producto.nombre}
              precio={producto.precio}
              img={NoImage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
