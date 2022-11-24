import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "../Button/Button";
import NotImg from "../../assets/NotImg.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./List.css";
import axios from "axios";
import { baseUrl, urlImages } from "../../apiConfig";
import { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const List = (props) => {
  const MySwal = withReactContent(Swal);
  let coleccionItem = ["", "", ""];

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
      text: `\"${coleccion.nombre}\" se eliminara completamente.`,
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
          `${coleccion.nombre} se ha removido.`,
          "success"
        );
        props.setReload();
      }
    });
  };

  const handleDeleteColeccion = async (coleccion) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/${coleccionItem[2]}/${coleccion._id}`, {
        headers: { "x-token": token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                    <Button
                      type='danger'
                      onlyIcon
                      onClick={() => handleAskToDelete(c)}
                      icono={<DeleteIcon fontSize='medium' />}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default List;
