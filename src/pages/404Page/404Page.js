import { Link } from "react-router-dom";
import NotFoundImg from "../../assets/404.jpg";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./NotFound.css";

const PageNotFound = (props) => {
  return (
    <>
      <div className='Container'>
        <div className='NotFoundContainer'>
          <div className='ImgNotFoundContainer'>
            <img
              className='imgNotFound'
              src={NotFoundImg}
              alt='La página no ha sido encontrada'
            />
          </div>
          <div className='BodyNotFound'>
            <PageTitle>OOPS!</PageTitle>
            <h1 className='h1NotFound'>¡Esta página no ha sido encontrada!</h1>
            <Link
              className='Button ButtonNotFound aLink ButtonLink primary'
              to='/'>
              Regresar
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
