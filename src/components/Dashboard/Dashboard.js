import InputText from "../InputText/InputText";
import "./Dashboard.css";
import ItemSelect from "./ItemSelect";

const Dashboard = (props) => {
  let listaCategorias = [
    {
      path: "/tienda/tuppers",
      categoria: "Recipientes para alimentos",
    },
    {
      path: "/tienda/botellas",
      categoria: "Botellas",
    },
    {
      path: "/tienda/cocina",
      categoria: "Utensilios de cocina",
    },
    {
      path: "/tienda/mesa",
      categoria: "Utensilios de mesa",
    },
    {
      path: "/tienda/sartenes",
      categoria: "Ollas y sartenes",
    },
    {
      path: "/tienda/vajillas",
      categoria: "Vajillas",
    },
  ];
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
        {listaCategorias.map((cat) => (
          <ItemSelect path={cat.path}>{cat.categoria}</ItemSelect>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
