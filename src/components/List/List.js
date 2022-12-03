import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "../Button/Button";
import NotImg from "../../assets/NotImg.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./List.css";
import axios from "axios";
import { baseUrl, urlImages } from "../../apiConfig";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const List = (props) => {
  const MySwal = withReactContent(Swal);
  let coleccionItem = ["", "", ""];
  let loading = <Loading />;

  if (props.categorias) {
    coleccionItem = ["Categoria", "categoria", "categorias"];
  }

  if (props.productos) {
    coleccionItem = ["Producto", "producto", "productos"];
  }

  if (props.usuarios) {
    coleccionItem = ["Usuario", "usuario", "usuarios"];
  }

  const handleAskToDelete = (coleccion) => {
    MySwal.fire({
      title: `¿Deseas eliminar este ${coleccionItem[1]}?`,
      text: `\"${
        props.usuarios ? coleccion.username : coleccion.nombre
      }\" se eliminara completamente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0652DD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteColeccion(coleccion);
        MySwal.fire(
          `¡${coleccionItem[0]} eliminada!`,
          `${
            props.usuarios ? coleccion.username : coleccion.nombre
          } se ha removido.`,
          "success"
        );
        props.handleEnviado();
      }
    });
  };

  const handleDeleteColeccion = async (coleccion) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${baseUrl}/${coleccionItem[2]}/${
          props.usuarios ? coleccion.uid : coleccion._id
        }`,
        {
          headers: { "x-token": token },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className='List'>
        <thead>
          <tr className='HeaderList'>
            {props.header.map((h, index) => {
              return <th key={index}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.categorias &&
            props.categorias.map((c, index) => {
              return (
                <tr key={index}>
                  <td className='ImgList'>
                    <img
                      src={
                        c.img
                          ? `${urlImages}/uploads/categorias/${c.img}`
                          : NotImg
                      }
                      alt={c.nombre}
                    />
                  </td>
                  <td>{c.nombre}</td>
                  <td>
                    <div className='OperacionesList'>
                      <Link
                        className='LinkCover LinkCard OperacionLink'
                        to={`/administrar/categorias/edit?categoria=${c._id}`}>
                        <Button
                          type='primary'
                          onlyIcon
                          icono={<EditIcon fontSize='medium' />}
                        />
                      </Link>
                      <div>
                        <Button
                          type='danger'
                          onlyIcon
                          onClick={() => handleAskToDelete(c)}
                          icono={<DeleteIcon fontSize='medium' />}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          {props.productos && !props.isLoading
            ? props.productos.map((p, index) => {
                return (
                  <tr key={index}>
                    <td className='ImgList'>
                      <img
                        src={
                          p.img
                            ? `${urlImages}/uploads/productos/${p.img}`
                            : NotImg
                        }
                        alt={p.nombre}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>
                      {p.detalles.length === 0
                        ? "No hay detalles"
                        : p.detalles.map((detalle, index) => (
                            <p
                              key={
                                index
                              }>{`${detalle.variable}: ${detalle.valor}`}</p>
                          ))}
                    </td>
                    <td>${p.precio.toFixed(2)}</td>
                    <td>
                      {
                        props.categoriasProductos.filter((c) => {
                          return c._id === p.categoria;
                        })[0].nombre
                      }
                    </td>
                    {/* <td>{p.nombreCategoria}</td> */}
                    <td>
                      <div className='OperacionesList'>
                        <Link
                          className='LinkCover LinkCard OperacionLink'
                          to={`/administrar/productos/edit?producto=${p._id}`}>
                          <Button
                            type='primary'
                            onlyIcon
                            icono={<EditIcon fontSize='medium' />}
                          />
                        </Link>
                        <div>
                          <Button
                            type='danger'
                            onlyIcon
                            onClick={() => handleAskToDelete(p)}
                            icono={<DeleteIcon fontSize='medium' />}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
          {props.usuarios && !props.isLoading
            ? props.usuarios.map((u, index) => {
                return (
                  <tr key={index}>
                    <td className='ImgList'>
                      <img
                        src={
                          u.usuario.img
                            ? `${urlImages}/uploads/usuarios/${u.usuario.img}`
                            : NotImg
                        }
                        alt={u.usuario.username}
                      />
                    </td>
                    <td>{u.usuario.username}</td>
                    <td>{u.usuario.correo}</td>
                    <td>
                      {u.usuario.rol === "ADMIN_ROL"
                        ? "Administrador"
                        : "Usuario"}
                    </td>
                    <td>{u.usuario.estado ? "Activo" : "Inhabilitado"}</td>
                    <td>
                      <div className='OperacionesList'>
                        <Link
                          className='LinkCover LinkCard OperacionLink'
                          to={`/administrar/usuarios/edit?usuario=${u.usuario.uid}`}>
                          <Button
                            type='primary'
                            onlyIcon
                            icono={<EditIcon fontSize='medium' />}
                          />
                        </Link>
                        <div>
                          {u.usuario.uid !== props.myIdUser && (
                            <Button
                              type='danger'
                              onlyIcon
                              onClick={() => handleAskToDelete(u.usuario)}
                              icono={<DeleteIcon fontSize='medium' />}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      {props.isLoading && loading}
    </>
  );
};

export default List;
