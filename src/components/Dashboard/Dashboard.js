import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrlDevelopment } from "../../apiConfig";
import InputText from "../InputText/InputText";
import "./Dashboard.css";
import ItemSelect from "./ItemSelect";

const Dashboard = (props) => {
  const [categorias, setCategorias] = useState([]);
  let onSelectCategory = props.onSelectCategory;

  useEffect(() => {
    const getCategorias = async () => {
      const url = `${baseUrlDevelopment}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
    };
    getCategorias();
  }, []);

  if (!props.onSelectCategory) {
    onSelectCategory = () => {};
  }
  return (
    <div className='Dashboard'>
      <h1>Tienda</h1>
      <InputText
        type='search'
        placeholder='Buscar en la tienda'
        justify='left'
      />
      <div>
        <h2>Filtro</h2>
        <div className='InputContainer'>
          <span className='dollar'>$</span>
          <InputText type='text' placeholder='Min' />
          <span className='dollar'>-</span>
          <span className='dollar'>$</span>
          <InputText type='text' placeholder='Max' />
        </div>
      </div>
      <div>
        <h2>Categorias</h2>
        {categorias.map((cat) => (
          <ItemSelect
            key={cat._id}
            id={cat._id}
            onSelectCategory={onSelectCategory}
            ruta={`/tienda/${cat.nombre
              .toLowerCase()
              .split(" ")
              .join("-")}?categoria=${cat._id}`}>
            {cat.nombre}
          </ItemSelect>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
