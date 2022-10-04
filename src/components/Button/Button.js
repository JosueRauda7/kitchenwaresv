import "./Button.css";

const Button = (props) => {
  return (
    <div
      className={`Button ${props.type ? props.type : ""}`}
      onClick={props.onClick}>
      <p>{props.children}</p>
    </div>
  );
};

export default Button;
