import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { baseUrl } from "../../../apiConfig";
import Button from "../../../components/Button/Button";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import Footer from "../../../components/Footer/Footer";
import InputText from "../../../components/InputText/InputText";
import PageTitle from "../../../components/PageTitle/PageTitle";
import "./CategoriaForm.css";

const FormularioCategoria = (props) => {
  const [categoria, setCategoria] = useState({});
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [imagenCategoria, setImagenCategoria] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [errorNombreCategoria, setErrorNombreCategoria] = useState("");
  const [errorImgCategoria, setErrorImgCategoria] = useState("");
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem("token");

  const { search } = useLocation();
  const categoriaIndexSearch = search.indexOf("categoria");
  const idCategoria = search.split(/\?|=|&/)[categoriaIndexSearch + 1];

  useEffect(() => {
    const getCategoria = async (idCat) => {
      const url = `${baseUrl}/categorias/${idCat}`;
      const res = await axios.get(url);
      setCategoria(res.data.body.categoria);
      setNombreCategoria(res.data.body.categoria.nombre);
    };
    getCategoria(idCategoria);
  }, []);

  if (enviado) {
    return <Navigate to='/administrar/categorias' />;
  }

  const validarErrores = (error) => {
    // if (error.response.data.errores.errors) {
    //   let errores = error.response.data.errores.errors;
    //   errores.map((err) => {
    //     switch (err.param) {
    //       case "nombre":
    //         setErrorNombreCategoria(err.msg);
    //         break;
    //     }
    //   });
    // } else {
    console.log(error);
    // }
  };

  const handleSetNombreCategoria = (e) => {
    setErrorNombreCategoria("");
    setNombreCategoria(e.target.value);
  };

  const handleSetImgCategoria = (e) => {
    setErrorImgCategoria("");
    setImagenCategoria(e.target.files[0]);
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      await handleAddNewCategoria();
    }
  };

  const handleAddNewCategoria = async () => {
    try {
      // Registramos primero categoria
      const res = await axios.post(
        `${baseUrl}/categorias`,
        {
          nombre: nombreCategoria,
        },
        {
          headers: { "x-token": token },
        }
      );
      if (imagenCategoria !== null) {
        const idCategoria = res.data.body.categoria._id;
        const formData = new FormData();
        formData.append("archivo", imagenCategoria, imagenCategoria.name);

        // Añadimos Imagen al categoria
        const res2 = await axios.put(
          `${baseUrl}/uploads/categorias/${idCategoria}`,
          formData,
          {
            headers: {
              "x-token": token,
            },
          }
        );
      }
      MySwal.fire({
        title: "¡Categoria agregada!",
        html: "La categoria se ha guardado exitosamente.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
      setEnviado(true);
    } catch (error) {
      validarErrores(error);
    }
  };

  const handleEditCategoria = async () => {
    try {
      // Registramos primero categoria
      const res = await axios.put(
        `${baseUrl}/categorias/${categoria._id}`,
        {
          nombre: nombreCategoria,
        },
        {
          headers: { "x-token": token },
        }
      );
      if (imagenCategoria !== null) {
        const idCategoria = res.data.body.categoria._id;
        const formData = new FormData();
        formData.append("archivo", imagenCategoria, imagenCategoria.name);

        // Añadimos Imagen al categoria
        const res2 = await axios.put(
          `${baseUrl}/uploads/categorias/${idCategoria}`,
          formData,
          {
            headers: {
              "x-token": token,
            },
          }
        );
      }
      MySwal.fire({
        title: "¡Categoria editada!",
        html: "La categoria se ha editado exitosamente.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
      setEnviado(true);
    } catch (error) {
      validarErrores(error);
    }
  };

  return (
    <>
      <div className='PageContainer'>
        <form className='CatalogoForm'>
          <PageTitle>{!categoria ? "Nuevo" : "Editar"} Categoria</PageTitle>
          <div className='FormContainer'>
            <div className='InputContainer'>
              <h2>Nombre de Categoria:</h2>
              <InputText
                type='text'
                value={nombreCategoria}
                onChange={handleSetNombreCategoria}
                justify='center'
                // onKeyDown={handlePressEnter}
                error={errorImgCategoria}
              />
            </div>
            <div className='InputContainer'>
              <h2>Imagen de Categoria:</h2>
              <InputText
                type='file'
                // value={imagenCatalogo.name}
                onChange={handleSetImgCategoria}
                justify='center'
                onKeyDown={handlePressEnter}
                error={errorImgCategoria}
                nombreArchivo={imagenCategoria}
              />
            </div>
            {/* {errorNombreCatalogo ? (
              <ErrorMessageBox>{errorNombreCatalogo}</ErrorMessageBox>
            ) : null}
            {errorImgCatalogo ? (
              <ErrorMessageBox>{errorImgCatalogo}</ErrorMessageBox>
            ) : null} */}
            <div className='Buttons'>
              <Button
                onClick={
                  !categoria ? handleAddNewCategoria : handleEditCategoria
                }
                type='primary'>
                {!categoria ? "Agregar" : "Guardar"}
              </Button>
              <Link
                className='LinkCover Button LinkCard danger'
                to='/administrar/categorias'>
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FormularioCategoria;
