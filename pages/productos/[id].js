import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase/config";
import { doc, getDoc, setDoc, deleteDoc } from "@firebase/firestore";
import Error404 from "../../components/Error404";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import AuthContext from "../../context/AuthProvider";

function Producto() {
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({
    mensaje: "",
  });

  const [consultaDB, setConsultaDB] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (id && consultaDB) {
      const obtenerProducto = async () => {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto(docSnap.data());
          setConsultaDB(false);
        } else {
          setError(true);
          setConsultaDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    votos,
    image,
    creador,
    haVotado,
  } = producto;

  const votarProducto = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const nuevoTotal = votos + 1;

    if (haVotado?.includes(user.uid)) return;

    const nuevoHaVotado = [...haVotado, user.uid];

    await setDoc(doc(db, "productos", id), {
      ...producto,
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
    });

    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    setConsultaDB(true);
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    comentario.usuarioId = user.uid;
    comentario.usuarioNombre = user.displayName;

    const nuevosComentarios = [...comentarios, comentario];

    setDoc(doc(db, "productos", id), {
      ...producto,
      comentarios: nuevosComentarios,
    });

    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    setConsultaDB(true);

    setComentario({
      mensaje: "",
    });
  };

  const esCreador = (id) => {
    if (creador.id === id) return true;
  };

  const puedeBorrar = () => {
    if (!user) return false;
    if (creador.id === user.uid) {
      return true;
    }
  };

  const eliminarProducto = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await deleteDoc(doc(db, "productos", id));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pagina="Productos">
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            {" "}
            <h1 className="titulo-producto">{nombre}</h1>
            <ContenedorProducto>
              <div>
                <p>
                  Publicado:{" "}
                  {formatDistanceToNow(new Date(creado), {
                    locale: es,
                  })}
                </p>
                <p>
                  Por: {creador.nombre} - {empresa}
                </p>
                <Imagen src={image} alt="" />

                <p>{descripcion}</p>
                {puedeBorrar() && (
                  <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
                )}

                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <textarea
                          name="mensaje"
                          rows="5"
                          placeholder="Escribe tu comentario"
                          value={comentario.mensaje}
                          onChange={(e) =>
                            setComentario({
                              ...comentario,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Campo>
                      <InputSubmit
                        type="submit"
                        value="Agregar Comentario"
                        onClick={agregarComentario}
                      />
                    </form>
                  </>
                )}

                <h2 className="comentario">Comentarios</h2>
                {comentarios.length === 0 ? (
                  "Aun no hay comentarios"
                ) : (
                  <ul>
                    {comentarios.map((comentario) => (
                      <li key={comentario.usuarioId} className="comentarios">
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por:{" "}
                          <span className="comentario-usuario">
                            {comentario.usuarioNombre}
                          </span>
                        </p>
                        {esCreador(comentario.usuarioId) && (
                          <Creador>Creador</Creador>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar Url
                </Boton>

                <div className="votos-container">
                  <p className="votos">{votos} Votos</p>
                  {user && <Boton onClick={votarProducto}>Votar</Boton>}
                </div>
              </aside>
            </ContenedorProducto>
          </div>
        )}
      </>
    </Layout>
  );
}

export default Producto;

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
`;

const Creador = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
`;
