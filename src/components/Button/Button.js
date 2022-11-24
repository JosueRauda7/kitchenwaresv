import "./Button.css";

const Button = (props) => {
  let iconoClass = "";
  if (props.icono) {
    iconoClass = "IconoButton";
  }
  return (
    <div
      className={`Button ${props.type ? props.type : ""}`}
      onClick={props.onClick}>
      {props.icono}{" "}
      {!props.onlyIcon && <p className={iconoClass}>{props.children}</p>}
    </div>
  );
};

export default Button;
