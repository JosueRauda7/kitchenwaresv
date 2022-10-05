import "./PageTitle.css";

const PageTitle = (props) => {
  return (
    <div className='PageTitle'>
      <h1>{props.children}</h1>
    </div>
  );
};

export default PageTitle;
