import "./LandingPage.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

import Tupper from "../../assets/tupper.jpg";
import Bottle from "../../assets/bottle.jpg";
import KitchenAccesories from "../../assets/kitchenaccesories.jpg";
import Tableware from "../../assets/tableware.jpg";
import Skillet from "../../assets/skillet.jpg";
import Plates from "../../assets/plates.jpg";

import Tupperware from "../../assets/tupperware.png";
import Renaware from "../../assets/renaware.png";
import Footer from "../../components/Footer/Footer";
// import Carrito from "../../components/Cart/Cart";

const LandingPage = (props) => {
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
          <Card img={Tupper} title='Recipientes para alimentos'>
            <Link className='LinkButton' to='/tienda/tuppers'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
          <Card img={Bottle} title='Botellas'>
            <Link className='LinkButton' to='/tienda/botellas'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
          <Card img={KitchenAccesories} title='Utensilios de cocina'>
            <Link className='LinkButton' to='/tienda/cocina'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
          <Card img={Tableware} title='Utensilios de mesa'>
            <Link className='LinkButton' to='/tienda/mesa'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
          <Card img={Skillet} title='Ollas y sartenes'>
            <Link className='LinkButton' to='/tienda/sartenes'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
          <Card img={Plates} title='Vajillas'>
            <Link className='LinkButton' to='/tienda/vajillas'>
              <Button type='primary'>Ver productos</Button>
            </Link>
          </Card>
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
