import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { db } from "../firebase/config";
import { collection, orderBy, getDocs } from "@firebase/firestore";
import DetallesProducto from "../components/DetallesProducto";
export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const datos = await getDocs(
        collection(db, "productos"),
        orderBy("creado", "desc")
      );
      setProductos(datos.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    obtenerProductos();
  }, []);

  return (
    <div>
      <Layout pagina="Inicio">
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
