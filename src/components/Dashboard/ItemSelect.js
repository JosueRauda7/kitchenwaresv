import { Link } from "react-router-dom";
import "./ItemSelect.css";

const ItemSelect = (props) => {
  return (
    <div
      className='ItemSelect'
      onClick={() => props.onSelectCategory(props.id)}>
      <Link className='LinkButton' to={props.ruta}>
        <p>{props.children}</p>
      </Link>
    </div>
  );
};

export default ItemSelect;
