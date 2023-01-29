import Button from "../Button/Button";
import "./Card.css";

const Card = (props) => {
  return (
    <div className='Card'>
      <div className='Image'>
        <img src={props.img} />
      </div>
      <div className='Header'>
        <h3>{props.title}</h3>
        <p className='Subtitle'>{props.subtitle}</p>
      </div>
      <div className='Body'>{props.children}</div>
    </div>
  );
};

export default Card;
