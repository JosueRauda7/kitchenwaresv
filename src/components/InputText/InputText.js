import "./InputText.css";
import SearchIcon from "@mui/icons-material/Search";
// import Button from "../Button/Button";
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
          onChange={props.onChange}
          className={`${props.justify}`}>
          {props.lista.map((op) => (
            <option
              key={op._id}
              value={op._id}
              selected={op._id === props.selected}>
              {op.nombre}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (props.type === "file") {
    inputText = (
      <div className='InputFile'>
        <input
          type='file'
          className='InputFileButton'
          id='subirArchivo'
          onChange={props.onChange}
          {...props}
        />
        <label className=' Button primary' for='subirArchivo'>
          Subir Archivo
        </label>
        <p className='archivoCargado'>
          {props.nombreArchivo
            ? `Archivo cargado: ${props.nombreArchivo.name}`
            : ""}
        </p>
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
