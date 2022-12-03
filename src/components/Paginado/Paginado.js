import Button from "../Button/Button";
import "./Paginado.css";

const Paginado = (props) => {
  return (
    <>
      {!props.isLoading && props.totalPaginas > 0 && (
        <div className='PageButtons'>
          {props.paginas.map((numPage) => (
            <Button
              type='primary'
              onClick={() => props.handleChangePage(numPage)}>
              {numPage}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default Paginado;
