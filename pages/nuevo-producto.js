import { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../helpers/validarCrearProducto";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthProvider";
import { db, storage } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";

import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function NuevoProducto() {
  //state de las imagenes
  const [selectedFile, setSelectedFile] = useState(null);

  const stateInicial = {
    nombre: "",
    empresa: "",
    url: "",
    descripcion: "",
  };
  const [error, setError] = useState(false);
  const router = useRouter();

  const { handleChange, handleSubmit, valores, errores, handleBlur } =
    useValidacion(stateInicial, validarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valores;

  const { user } = useContext(AuthContext);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  async function crearProducto() {
    //si el usuario no esta autenticado
    if (!user) {
      //redireccionar al login
      router.push("/login");
      return;
    }

    //Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: serverTimestamp(),
    };

    try {
      //crear el producto en la base de datos
      const docRef = await addDoc(collection(db, "productos"), producto);

      //Upload tge image to firebase storage with the post ID
      const imageRef = ref(storage, `productos/${docRef.id}`);

      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
          //Get the download url form storage and update the original post with image
          await updateDoc(doc(db, "productos", docRef.id), {
            image: downloadUrl,
          });
        }
      );
      //Redireccionar al home
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <Layout pagina="Nuevo Producto">
        <h1 className="titulo">Nuevo Producto</h1>
        <Formulario onSubmit={handleSubmit}>
          <fieldset>
            <legend>Informacion General </legend>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu Nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}

            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                placeholder="Empresa o Compañia"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}

            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input type="file" id="imagen" onChange={addImageToPost} />
            </Campo>
            {errores.imagen && <Error>{errores.imagen}</Error>}

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="URL de tu producto"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}
          </fieldset>

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Crear Producto" />
        </Formulario>
      </Layout>
    </>
  );
}

export default NuevoProducto;
