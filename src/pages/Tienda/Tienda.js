import Item from "../../components/Item/Item";
import ItemImg from "../../assets/ItemExample.jpeg";
import ItemImg2 from "../../assets/ItemExample2.jpeg";
import ItemImg3 from "../../assets/ItemExample3.jpeg";
import "./Tienda.css";
import { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

const Tienda = (props) => {
  const [isShowModal, setShowModal] = useState(false);

  const handleModal = (descripcion) => {};

  return (
    <div>
      <PageTitle>Productos</PageTitle>
      <div className='itemContainer'>
        <Item
          img={ItemImg}
          title='Tupper para Aguacate, Tomate y Ajo'
          precio={8.65}
        />
        <Item img={ItemImg2} title='Botellas 2mL' precio={10} />
        <Item img={ItemImg3} title='Jarra Universal' precio={7} />
        <Item
          img={ItemImg}
          title='Tupper para Aguacate, Tomate y Ajo'
          precio={8.65}
        />
        <Item
          img={ItemImg}
          title='Tupper para Aguacate, Tomate y Ajo'
          precio={8.65}
        />
      </div>
    </div>
  );
};

export default Tienda;
