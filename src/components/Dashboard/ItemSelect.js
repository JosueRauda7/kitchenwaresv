import { Link } from "react-router-dom";
import "./ItemSelect.css";

const ItemSelect = (props) => {
  return (
    <div className='ItemSelect'>
      <Link className='LinkButton' path={props.path}>
        <p>{props.children}</p>
      </Link>
    </div>
  );
};

export default ItemSelect;
