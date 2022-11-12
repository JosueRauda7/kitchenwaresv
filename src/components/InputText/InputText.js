import "./InputText.css";
import SearchIcon from "@mui/icons-material/Search";
import ErrorMessageBox from "../ErrorMessageBox/ErrorMessageBox";

const InputText = (props) => {
  let inputText = (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={`Input ${props.justify}`}
      value={props.value}
      {...props}
    />
  );

  if (props.type === "search") {
    inputText = (
      <div className='InputSearch'>
        <SearchIcon fontSize='medium' />
        <input
          type='text'
          placeholder={props.placeholder}
          className={`${props.justify}`}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  }
  if (props.type === "select") {
    inputText = (
      <div className='InputSelect'>
        <select
          placeholder={props.placeholder}
          className={`${props.justify}`}
          name={props.nombreLista}>
          {props.lista.map((op) => (
            <option value={op}>{op}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className='InputText'>
      {inputText}{" "}
      {props.error ? <ErrorMessageBox>{props.error}</ErrorMessageBox> : null}
    </div>
  );
};

export default InputText;
