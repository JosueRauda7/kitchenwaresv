import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { baseUrl } from "../../../apiConfig";
import Button from "../../../components/Button/Button";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import Footer from "../../../components/Footer/Footer";
import InputText from "../../../components/InputText/InputText";
import PageTitle from "../../../components/PageTitle/PageTitle";
import "./ProductoForm.css";

const FormularioProducto = (props) => {
  const [producto, setProducto] = useState(null);
  const [categoriaIdProducto, setCategoriaIdProducto] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [detallesProducto, setDetallesProducto] = useState([]);
  const [precioProducto, setPrecioProducto] = useState(0);
  const [stockProducto, setStockProducto] = useState(0);
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [imagenProducto, setImagenProducto] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [errorNombreProducto, setErrorNombreProducto] = useState("");
  const [errorImgProducto, setErrorImgProducto] = useState("");
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem("token");
  const { search } = useLocation();
  const productoIndexSearch = search.indexOf("producto");
  const idProducto = search.split(/\?|=|&/)[productoIndexSearch + 1];

  useEffect(() => {
    if (idProducto) {
      const getProducto = async (idPro) => {
        const url = `${baseUrl}/productos/${idPro}`;
        const res = await axios.get(url);
        const product = await res.data.body.producto;
        setProducto(product);
        setNombreProducto(product.nombre);
        setPrecioProducto(product.precio);
        setDetallesProducto(product.detalles);
        setDescripcionProducto(product.descripcion);
        setStockProducto(product.stock);
        const res2 = await axios.get(
          `${baseUrl}/categorias/${product.categoria}`
        );
        const categoria = await res2.data.body.categoria;
        setCategoriaIdProducto(categoria);
      };
      getProducto(idProducto);
    }
    const cargarCategorias = async () => {
      const res3 = await axios.get(`${baseUrl}/categorias`);
      const categories = await res3.data.body.categorias;
      setCategorias(categories);
      setCategoriaIdProducto(categories[0]._id);
    };
    cargarCategorias();
    // }
  }, []);

  if (enviado) {
    return <Navigate to='/administrar/productos' />;
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

  const handleSetNombreProducto = (e) => {
    setErrorNombreProducto("");
    setNombreProducto(e.target.value);
  };

  const handleSetDescripcionProducto = (e) => {
    setErrorNombreProducto("");
    setDescripcionProducto(e.target.value);
  };

  const handleSetPrecioProducto = (e) => {
    setErrorNombreProducto("");
    setPrecioProducto(e.target.value);
  };

  const handleSetStockProducto = (e) => {
    setErrorNombreProducto("");
    setStockProducto(e.target.value);
  };

  const handleSetImgProducto = (e) => {
    setErrorImgProducto("");
    setImagenProducto(e.target.files[0]);
  };

  const handleSetCategoriaProducto = (e) => {
    setErrorImgProducto("");
    setCategoriaIdProducto(e.target.value);
    setCategoriaProducto(e.target.value);
  };

  const handleSetVariable = (e, index) => {
    const detalleProducto = detallesProducto[index];

    const nuevosDetalles = detallesProducto.map((dt) => {
      if (dt.variable === detalleProducto.variable) {
        dt.variable = e.target.value;
      }
      return dt;
    });

    setDetallesProducto(nuevosDetalles);
  };

  const handleSetValor = (e, index) => {
    const detalleProducto = detallesProducto[index];

    const nuevosDetalles = detallesProducto.map((dt) => {
      if (dt.variable === detalleProducto.variable) {
        dt.valor = e.target.value;
      }
      return dt;
    });

    setDetallesProducto(nuevosDetalles);
  };

  const handleAnidarDetalle = () => {
    setDetallesProducto([...detallesProducto, { variable: "", valor: "" }]);
  };

  const handleEliminarDetalle = (index) => {
    const detalleProducto = detallesProducto[index];

    const nuevosDetalles = detallesProducto.filter(
      (dt) => dt.variable !== detalleProducto.variable
    );

    setDetallesProducto(nuevosDetalles);
  };

  const handlePressEnter = async (e) => {
    if (e.key === "Enter") {
      await handleAddNewProducto();
    }
  };

  const handleAddNewProducto = async () => {
    try {
      // Registramos primero productos
      const res = await axios.post(
        `${baseUrl}/productos`,
        {
          nombre: nombreProducto,
          descripcion: descripcionProducto,
          detalles: detallesProducto,
          precio: +precioProducto,
          stock: +stockProducto,
          categoria: categoriaIdProducto,
        },
        {
          headers: { "x-token": token },
        }
      );
      if (imagenProducto !== null) {
        const idProduct = res.data.producto._id;
        const formData = new FormData();
        formData.append("archivo", imagenProducto, imagenProducto.name);

        // Añadimos Imagen al producto
        await axios.put(`${baseUrl}/uploads/productos/${idProduct}`, formData, {
          headers: {
            "x-token": token,
          },
        });
      }
      MySwal.fire({
        title: "¡Producto agregado!",
        html: "El producto se ha guardado exitosamente.",
        icon: "success",
        timer: "1400",
        showConfirmButton: false,
      });
      setEnviado(true);
    } catch (error) {
      validarErrores(error);
    }
  };

  const handleEditProducto = async () => {
    try {
      // Registramos primero producto
      const res = await axios.put(
        `${baseUrl}/productos/${producto._id}`,
        {
          nombre: nombreProducto,
          descripcion: descripcionProducto,
          detalles: detallesProducto,
          precio: +precioProducto,
          stock: +stockProducto,
          categoria: categoriaIdProducto,
        },
        {
          headers: { "x-token": token },
        }
      );
      if (imagenProducto !== null) {
        const idProducto = res.data.body.producto._id;
        const formData = new FormData();
        formData.append("archivo", imagenProducto, imagenProducto.name);

        // Añadimos Imagen al categoria
        const res2 = await axios.put(
          `${baseUrl}/uploads/productos/${idProducto}`,
          formData,
          {
            headers: {
              "x-token": token,
            },
          }
        );
      }
      MySwal.fire({
        title: "¡Producto editado!",
        html: "El producto se ha editado exitosamente.",
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
          <PageTitle>{!producto ? "Nuevo" : "Editar"} Producto</PageTitle>
          <div className='FormContainer'>
            <div className='InputContainer'>
              <h2>Nombre de Producto:</h2>
              <InputText
                type='text'
                value={nombreProducto}
                onChange={handleSetNombreProducto}
                justify='center'
                // onKeyDown={handlePressEnter}
                error={errorImgProducto}
              />
            </div>
            <div className='InputContainer'>
              <h2>Descripción:</h2>
              <InputText
                type='text'
                value={descripcionProducto}
                onChange={handleSetDescripcionProducto}
                justify='center'
                // onKeyDown={handlePressEnter}
                error={errorImgProducto}
              />
            </div>
            <div className='InputContainer'>
              <h2>*Detalles:</h2>
              {!detallesProducto ? (
                <h3>No hay detalles</h3>
              ) : (
                detallesProducto.map((detalle, index) => (
                  <div className='Detalle' key={index}>
                    <InputText
                      type='text'
                      value={detalle.variable}
                      onChange={(e) => handleSetVariable(e, index)}
                      justify='center'
                      error={errorImgProducto}
                      placeholder='Ej: Color'
                    />
                    <h2>:</h2>
                    <InputText
                      type='text'
                      value={detalle.valor}
                      onChange={(e) => handleSetValor(e, index)}
                      justify='center'
                      error={errorImgProducto}
                      placeholder='Ej: Azul'
                    />
                    <div
                      className='CarritoItemBorrar'
                      style={{ width: "40px" }}>
                      <Button
                        type='danger'
                        onClick={() => handleEliminarDetalle(index)}>
                        <RemoveCircleIcon />
                      </Button>
                    </div>
                  </div>
                ))
              )}
              <Button
                type='primary'
                icono={<AddCircleIcon fontSize='medium' />}
                onClick={handleAnidarDetalle}>
                Agregar Detalle
              </Button>
            </div>
            <div className='InputContainer'>
              <h2>Precio (USD $):</h2>
              <InputText
                type='text'
                value={precioProducto}
                onChange={handleSetPrecioProducto}
                justify='center'
                // onKeyDown={handlePressEnter}
                error={errorImgProducto}
              />
            </div>
            <div className='InputContainer'>
              <h2>Número de existencias:</h2>
              <InputText
                type='text'
                value={stockProducto}
                onChange={handleSetStockProducto}
                justify='center'
                // onKeyDown={handlePressEnter}
                error={errorImgProducto}
              />
            </div>
            <div className='InputContainer'>
              <h2>*Imagen de Producto:</h2>
              <InputText
                type='file'
                // value={imagenCatalogo.name}
                onChange={handleSetImgProducto}
                justify='center'
                onKeyDown={handlePressEnter}
                error={errorImgProducto}
                nombreArchivo={imagenProducto}
              />
            </div>
            <div className='InputContainer'>
              <h2>Categoria:</h2>
              <InputText
                type='select'
                value={categoriaIdProducto}
                lista={categorias}
                onChange={handleSetCategoriaProducto}
                justify='center'
                onKeyDown={handlePressEnter}
                error={errorImgProducto}
                selected={producto ? producto.categoria : ""}
              />
            </div>
            {/* {errorNombreCatalogo ? (
              <ErrorMessageBox>{errorNombreCatalogo}</ErrorMessageBox>
            ) : null}
            {errorImgCatalogo ? (
              <ErrorMessageBox>{errorImgCatalogo}</ErrorMessageBox>
            ) : null} */}
            <br />
            <h3>Nota: (*) es opcional su valor.</h3>
            <div className='Buttons'>
              <Button
                onClick={!producto ? handleAddNewProducto : handleEditProducto}
                type='primary'>
                {!producto ? "Agregar" : "Guardar"}
              </Button>
              <Link
                className='LinkCover Button LinkCard danger'
                to='/administrar/productos'>
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

export default FormularioProducto;
