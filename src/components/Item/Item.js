import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import "./Item.css";

const Item = (props) => {
  return (
    <Link
      to={`/tienda${props.category ? "" : "/productos"}/${props.title
        .toLowerCase()
        .split(" ")
        .join("-")}?${props.category ? "categoria" : "producto"}=${props.id}`}
      className={`Item LinkItem`}>
      <div
        className={`Image ${
          props.category ? "ImageCatalogo" : "ImageProducto"
        }`}>
        <img src={props.img} />
      </div>
      <div className='Header'>
        <h3>{props.title}</h3>
        {props.precio ? (
          <p className='Precio'>Precio: ${props.precio.toFixed(2)}</p>
        ) : null}
      </div>
      {/* <div className='Body'>
        <p className='Descripcion'>
          Ideal para guardar chiles, tomates y aguacates y conservarlos por una
          mayor cantidad de tiempo sin perder su calidad y sabor.
        </p>
      </div> */}
      <div className='FooterItem'>
        <div className='Buttons'>
          {/* <Button type='info'>Ver mas detalles...</Button> */}
          {props.to ? (
            <Link to={props.to} className='Button primary LinkButton LinkCard'>
              {props.titleButton}
            </Link>
          ) : (
            <Button type='primary' onClick={props.onClick}>
              {props.titleButton}
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Item;
