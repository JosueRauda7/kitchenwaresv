import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../apiConfig";

import Button from "../../../components/Button/Button";
import Footer from "../../../components/Footer/Footer";
import List from "../../../components/List/List";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Paginado from "../../../components/Paginado/Paginado";
import "../AdminColeccion.css";

const AdminCategoria = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginas, setPaginas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategorias = async (pag = 1) => {
    const url = `${baseUrl}/categorias?limit=${limit}&page=${pag}&start=${
      pag === 1 ? 0 : limit * (pag - 1)
    }`;
    const res = await axios.get(url);
    const cats = res.data.body.categorias;
    const totalCategorias = res.data.body.totalCategorias;
    const paginasTotal = Math.ceil(totalCategorias / limit);
    let pages = [];
    console.log(paginasTotal);
    let i =
      pag === 1
        ? 1
        : pag === 2
        ? pag - 1
        : pag === paginasTotal - 1
        ? pag - 3
        : pag === paginasTotal
        ? pag - 4
        : pag - 2;
    let limite =
      paginasTotal === 1
        ? paginasTotal
        : paginasTotal < 5
        ? paginasTotal
        : pag === 1
        ? pag + 4
        : pag === 2
        ? pag + 3
        : pag === paginasTotal - 1
        ? paginasTotal
        : pag === paginasTotal
        ? paginasTotal
        : pag + 2;
    // for (let i = 1; i <= paginasTotal; i++) {
    console.log(i, limite);
    for (i; i <= limite; i++) {
      if (i <= 0) {
        continue;
      }
      if (i === 1) {
        pages.push(1);
        continue;
      }
      pages.push(i);
    }

    setPaginas(pages);
    setTotalPaginas(paginasTotal);
    setPage(pag);
    setCategorias(cats);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const handleChangePage = async (pagIndex) => {
    setIsLoading(true);
    getCategorias(pagIndex);
  };

  const handleEnviado = () => {
    const getCategorias = async () => {
      const url = `${baseUrl}/categorias?limit=15`;
      const res = await axios.get(url);
      setCategorias(res.data.body.categorias);
      setIsLoading(false);
    };
    getCategorias();
  };

  return (
    <>
      <div className='PageContainer'>
        <div className='AdminColeccionContainer'>
          <PageTitle>Catalogos</PageTitle>
          <div className='BodyAdminColeccion'>
            <div className='ButtonNuevoColeccion'>
              <Link to='/administrar/categorias/agregar' className='LinkCover'>
                <Button type='primary' icono={<AddBoxIcon fontSize='large' />}>
                  Nueva Categoria
                </Button>
              </Link>
            </div>
            <div className='TableCatalogo'>
              <List
                isLoading={isLoading}
                header={["Imagen", "Nombre", "Operaciones"]}
                categorias={categorias}
                handleEnviado={handleEnviado}
              />
            </div>
            <Paginado
              isLoading={isLoading}
              totalPaginas={totalPaginas}
              paginas={paginas}
              handleChangePage={handleChangePage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminCategoria;
