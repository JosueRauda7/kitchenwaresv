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

const AdminUsuarios = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginas, setPaginas] = useState([]);
  const ID_USER = localStorage.getItem("idUsuario");
  const token = localStorage.getItem("token");

  const getUsuarios = async (pag = 1) => {
    try {
      const url = `${baseUrl}/usuarios?limit=${limit}&page=${pag}&start=${
        pag === 1 ? 0 : limit * (pag - 1)
      }`;
      const res = await axios({
        method: "get",
        url,
        headers: {
          "x-token": token,
        },
      });
      setUsuarios(res.data.body.usuarios);
      const totalUsuarios = res.data.body.totalUsuarios;
      const paginasTotal = Math.ceil(
        totalUsuarios > limit ? totalUsuarios / limit : 1
      );
      let pages = [];
      let i =
        pag === 1
          ? pag
          : pag === 2
          ? pag - 1
          : pag === paginasTotal - 1
          ? pag - 3
          : pag === paginasTotal
          ? pag - 4
          : pag - 2;
      let limite =
        paginasTotal === 1
          ? 1
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
      for (i; i <= limite; i++) {
        pages.push(i);
      }
      setPaginas(pages);
      setTotalPaginas(paginasTotal);
      setPage(pag);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const handleChangePage = async (pagIndex) => {
    setIsLoading(true);
    getUsuarios(pagIndex);
  };

  const handleEnviado = () => {
    setIsLoading(true);
    getUsuarios();
  };

  return (
    <>
      <div className='PageContainer'>
        <div className='AdminColeccionContainer'>
          <PageTitle>Usuarios</PageTitle>
          <div className='BodyAdminColeccion'>
            <div className='ButtonNuevoColeccion'>
              <Link to='/administrar/usuarios/agregar' className='LinkCover'>
                <Button type='primary' icono={<AddBoxIcon fontSize='large' />}>
                  Nuevo Usuario
                </Button>
              </Link>
            </div>
            <div className='TableCatalogo'>
              <List
                isLoading={isLoading}
                header={[
                  "Imagen",
                  "Usuario",
                  "Correo",
                  "Rol",
                  "Estado",
                  "Operaciones",
                ]}
                usuarios={usuarios}
                handleEnviado={handleEnviado}
                myIdUser={ID_USER}
              />
            </div>
            <Paginado
              isLoading={isLoading}
              totalPaginas={totalPaginas}
              paginas={paginas}
              handleChangePage={handleChangePage}
            />
            {/* {!isLoading && totalPaginas > 0 && (
              <div className='PageButtons'>
                {paginas.map((numPage) => (
                  <Button
                    type='primary'
                    onClick={() => handleChangePage(numPage)}>
                    {numPage}
                  </Button>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminUsuarios;
