import "./Loading.css";

const Loading = (props) => {
  return (
    <div className='LoadingContainer'>
      <div className='Loading'>
        <div className={props.bg}></div>
        <div className={props.bg}></div>
        <div className={props.bg}></div>
      </div>
    </div>
  );
};

export default Loading;
