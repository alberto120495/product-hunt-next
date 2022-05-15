import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/DetallesProducto";
import useProductos from "../hooks/useProductos";
import { useEffect, useState } from "react";

function Buscar() {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { productos } = useProductos("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtrados = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });
    setResultado(filtrados);
  }, [q, productos]);

  useEffect;
  return (
    <>
      <Layout pagina="Busqueda">
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Buscar;
