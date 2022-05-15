import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/DetallesProducto";
import useProductos from "../hooks/useProductos";

export default function Populares() {
  const { productos } = useProductos("votos");

  return (
    <div>
      <Layout pagina="Populares">
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
