import Button from "../Button/Button";
import "./Item.css";

const Item = (props) => {
  return (
    <div className='Item'>
      <div className='Image'>
        <img src={props.img} />
      </div>
      <div className='Header'>
        <h3>{props.title}</h3>
        <p className='Precio'>${props.precio}</p>
      </div>
      {/* <div className='Body'>
        <p className='Descripcion'>
          Ideal para guardar chiles, tomates y aguacates y conservarlos por una
          mayor cantidad de tiempo sin perder su calidad y sabor.
        </p>
      </div> */}
      <div className='Footer'>
        <div className='Buttons'>
          <Button type='info'>Ver mas detalles...</Button>
          <Button type='primary'>Comprar</Button>
          <Button type='add'>Añadir al carrito</Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
