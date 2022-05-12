import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
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

  const router = useRouter();
  const { id } = router.query;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto(docSnap.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id, producto]);

  if (Object.keys(producto).length === 0) return "Cargando...";

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

    if (haVotado.includes(user.uid)) return;

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
  };

  return (
    <Layout pagina="Productos">
      <>
        {error && <Error404 />}

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

              {user && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form>
                    <Campo>
                      <textarea
                        id="comentario"
                        name="comentario"
                        rows="5"
                        placeholder="Escribe tu comentario"
                      />
                    </Campo>
                    <InputSubmit type="submit" value="Agregar Comentario" />
                  </form>
                </>
              )}

              <h2 className="comentario">Comentarios</h2>
              <ul>
                {comentarios.map((comentario) => (
                  <li key={comentario.id}>
                    <p>{comentario.nombre}</p>
                    <p>Escrito por:{comentario.usuario}</p>
                  </li>
                ))}
              </ul>
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
