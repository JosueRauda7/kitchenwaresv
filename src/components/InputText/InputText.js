import "./InputText.css";

const InputText = (props) => {
  return (
    <div className='InputText'>
      <input type={props.type} className='Input' />
    </div>
  );
};

export default InputText;
