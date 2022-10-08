import InputText from "../InputText/InputText";
import "./Dashboard.css";
import ItemSelect from "./ItemSelect";

const Dashboard = (props) => {
  let listaCategorias = [
    {
      ruta: "/tienda/tuppers",
      categoria: "Recipientes para alimentos",
    },
    {
      ruta: "/tienda/botellas",
      categoria: "Botellas",
    },
    {
      ruta: "/tienda/cocina",
      categoria: "Utensilios de cocina",
    },
    {
      ruta: "/tienda/mesa",
      categoria: "Utensilios de mesa",
    },
    {
      ruta: "/tienda/sartenes",
      categoria: "Ollas y sartenes",
    },
    {
      ruta: "/tienda/vajillas",
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
        {listaCategorias.map((cat, id) => (
          <ItemSelect key={id} ruta={cat.ruta}>
            {cat.categoria}
          </ItemSelect>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
