import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Carrito = (props) => {
  return (
    <div className='Cart'>
      <Link className='LinkButton CartLink' to='/cart'>
        <ShoppingCartIcon fontSize='large' />
      </Link>
    </div>
  );
};

export default Carrito;
