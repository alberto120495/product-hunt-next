import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/DetallesProducto";
import useProductos from "../hooks/useProductos";
export default function Home() {
  const { productos } = useProductos("creado");

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
