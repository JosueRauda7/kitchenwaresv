import { Link } from "react-router-dom";
import "./PanelButton.css";

const PanelButton = (props) => {
  return (
    <Link className='PanelButton aLink primary' to={props.to}>
      {props.icono} {props.title}
    </Link>
  );
};

export default PanelButton;
