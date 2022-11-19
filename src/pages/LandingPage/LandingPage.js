import "./LandingPage.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

import NoImage from "../../assets/tupper.jpg";

import Tupperware from "../../assets/tupperware.png";
import Renaware from "../../assets/renaware.png";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrlDevelopment } from "../../apiConfig";

const LandingPage = (props) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const res = await axios.get(`${baseUrlDevelopment}/categorias?limit=10`);
      setCategorias(res.data.body.categorias);
    };
    getCategorias();
  }, []);

  return (
    <div className='LandingPage'>
      {/* <Carrito /> */}
      <section className='Portada Parallax'>
        <div className='ContentPortada'>
          <h1>Mejora tu estilo de vida con Kitchenware</h1>
          <h2>
            Los mejores productos de cocina y mesa para el hogar a tu alcance.
          </h2>
          <div className='PortadaButton'>
            <Link className='LinkButton' to='/tienda'>
              <Button type='big'>Ir a Tienda</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='NoParallax Productos'>
        <div className='ProductosHeader'>
          <h1>Nuestros productos</h1>
          <h3>¡Visita nuestra Tienda!</h3>
        </div>
        <div className='CatalogoContainer'>
          {!categorias ? (
            <h2 style={{ marginTop: "20px" }}>
              No se encuentran productos de esta categoria.
            </h2>
          ) : (
            categorias.map((cat) => {
              return (
                <Card key={cat._id} img={cat.img || NoImage} title={cat.nombre}>
                  <Link
                    className='LinkButton'
                    to={`/tienda/${cat.nombre
                      .toLowerCase()
                      .split(" ")
                      .join("-")}?categoria=${cat._id}`}>
                    <Button type='primary'>Ver productos</Button>
                  </Link>
                </Card>
              );
            })
          )}
        </div>
      </section>
      <section className='NoParallax Marcas'>
        <div className='MarcasHeader'>
          <h1>Nuestras marcas</h1>
          <h3>¡Calidad en tu mesa!</h3>
        </div>
        <div className='MarcasBody'>
          <img src={Tupperware} />
          <img src={Renaware} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
