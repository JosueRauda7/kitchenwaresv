import Button from "../Button/Button";
import Delete from "@mui/icons-material/Delete";

import "./ItemCarrito.css";

const ItemCarrito = (props) => {
  return (
    <div className='CarritoItem'>
      <div className='CarritoItemImagen'>
        <img src={props.img} />
      </div>
      <div className='CarritoItemBody'>
        <h2>{props.nombre}</h2>
        <p>${props.precio.toFixed(2)} c/u</p>
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

export default ItemCarrito;
